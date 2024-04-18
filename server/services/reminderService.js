const {
  Appointment,
  Patient,
  ContactInformation,
  User,
  Profile,
  Doctor,
} = require("../models");
const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const nodemailer = require("nodemailer");

const sendSMS = async (phoneNumber, message) => {
  try {
    await twilio.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    console.log(`SMS has been sent to ${phoneNumber}`);
  } catch (error) {
    console.error("Error occurred sending SMS:", error);
  }
};

const sendEmail = async (email, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail", // this dose not have to be gmial only for devlopment porpose; can be added SMTP
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    let mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: subject,
      text: text,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error occure sending email:", error);
  }
};

exports.sendAppointmentReminders = async () => {
  try {
    // Get appointments for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const appointments = await Appointment.findAll({
      where: {
        appointment_datetime: {
          [Op.between]: [
            tomorrow,
            new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000),
          ],
        },
        reminder_sent: false,
      },
      include: [
        {
          model: Patient,
          include: [
            {
              model: User,
              include: Profile,
            },
            ContactInformation,
          ],
        },
        {
          model: Doctor,
          include: User,
        },
      ],
    });

    appointments.forEach(async (appointment) => {
      const patientName = `${appointment.patient.user.profile.first_name} ${appointment.patient.user.profile.last_name}`;
      const doctorName = `${appointment.doctor.user.profile.last_name}`;
      const { phone, email } = appointment.patient.contactInformation;

      const oneDayMessage = `Dear ${patientName}, your appointment with Dr. 
      ${doctorName} is scheduled for tomorrow. Please remember to attend or you can cancel your appointment now.`;
      const oneHourMessage = `Dear ${patientName}, your appointment with Dr. 
      ${doctorName} is scheduled in one hour. Please remember to attend 15 min early.`;

      // Send reminder for one day before
      sendSMS(phone, oneDayMessage);
      sendEmail(email, "Appointment Reminder", oneDayMessage);

      // Calculate one hour before appointment time
      const oneHourBefore = new Date(
        appointment.appointment_datetime.getTime() - 60 * 60 * 1000
      );
      const currentTime = new Date();
      if (oneHourBefore > currentTime) {
        setTimeout(() => {
          sendSMS(phone, oneHourMessage);
          sendEmail(email, "Appointment Reminder", oneHourMessage);
        }, oneHourBefore - currentTime);
      }

      appointment.reminder_sent = true;
      await appointment.save();
    });
  } catch (error) {
    console.error("Error sending appointment reminders:", error);
  }
};

const nodemailer = require('nodemailer');
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;
const appUrl = 'http://localhost:3000'

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user,
        pass,
    },
});

module.exports.sendAdoptionEmail = ( pet, user) => {
    transport
        .sendMail({
            to: pet.shelter.email,
            from: 'Get a Pet Team <getapetapp@gmail.com>',
            subject: 'One of your pets can be adopted!',
            html: `<h1>Hi ${pet.shelter.name}</h1> <p>A person wants to adopt "${pet.name}", click below to contact him ❤️</p> <a href="${appUrl}/adopters/${user.id}" style="padding: 10px 20px; color: white; background-color: pink; border-radius: 5px;">Click here</a>`
        });
};

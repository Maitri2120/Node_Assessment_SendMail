const express = require('express');
const router = express.Router();

const postmark = require("postmark");


// use postmark api:
const client = new postmark.ServerClient(process.env.postmark_key);


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Send Mail

router.post('/mail', async (req, res) => {
    try {
        const { to, to_name, from, from_name, subject, body ,isHTML} = req.body;

        // Check for required field
        if (!to || !to_name || !from || !from_name || !subject || !body) {
            return res.status(400).send({
                message: "All Fields are requires"
            })
        }

        // Default HTML_Status is false
        let HTML_Status = (isHTML == "true") ? true : false;

        if (HTML_Status == true) {
            client.sendEmail({
                "From": from,
                "To": to,
                "Subject": subject,
                "HtmlBody": body,
            }, function (error, result) {
                if (error) {
                    return res.status(500).send({
                        message: error?.message || "html body - send mail error",
                        error: error
                    })
                }
                return res.send({
                    message: `send mail to ${to} with htmlBody`
                })
            })

        } else {
            client.sendEmail({
                "From": from,
                "To": to,
                "Subject": subject,
                "TextBody": body,
            }, function (error, result) {
                if (error) {
                    return res.status(500).send({ 
                        message: error?.message || "text body - send mail error",
                        error: error
                    })
                }
                return res.send({
                    message: `send mail to ${to} with textBody`
                })
            })
        }

    }
    catch (err) {
        return res.send({
            message: err?.message || "Server Error",
            error: err
        })
    }

})


module.exports = router;
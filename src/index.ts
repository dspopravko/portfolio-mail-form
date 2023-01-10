import cors from 'cors'
import express, {Request, Response} from 'express'
import {createTransport, getTestMessageUrl} from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = process.env.PORT || 3000

const parserMiddleware = express.json()
app.use(parserMiddleware)

app.use(cors())

app.get('/', (req: Request, res: Response) => {
	res.send('Wake up samurai')
})

app.post('/', async (req: Request, res: Response) => {
	// await sendEmail(req.body)
	console.log(process.env.PRIVATE_KEY)
	console.log(req.body)
	res.send(req.body)
})

app.listen(port, () => {
	console.log(`Mail app listening on port ${port}`)
})

const sendEmail = async (mail: mailType) => {

	let info = await transporter.sendMail({
		from: 'dspopravko-service', // sender address
		to: "demid1498@gmail.com", // list of receivers
		subject: `Message from ${mail.name}`, // Subject line
		text: `Body: ${mail.message}`, // plain text body
	});

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

let transporter = createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER_NAME, // generated ethereal user
		pass: process.env.GMAIL_PASSWORD, // generated ethereal password
	},
});

type mailType = {
	name: string
	email: string
	message: string
}
import cors from 'cors'
import express, {Request, Response} from 'express'
import {createTransport} from 'nodemailer'
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
	const emailRes = await sendEmail(req.body)
	console.log(req.body)
	res.status(200).send(emailRes)
})

app.listen(port)

const sendEmail = async (mail: mailType) => {
	console.log('send email')
	return await transporter.sendMail({
		from: 'dspopravko-service', // sender address
		to: process.env.MAIL_RECEIVER, // list of receivers
		subject: `Message from: ${mail.name}`, // Subject line
		text: `Body: ${mail.message}`, // plain text body
	});
}

const transporter = createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER_NAME,
		pass: process.env.GMAIL_PASSWORD,
	},
});

type mailType = {
	name: string
	email: string
	message: string
}
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === "POST") {
    const requestParams = JSON.parse(req.body)
    console.log("requestParams", requestParams)
    try {
      // const allDevices = await prisma.device.deleteMany({})
      const allDevices = await prisma.device.createMany({
        data: requestParams
      })
      // const allDevices = []
      return res.status(200).json(allDevices)
    } catch (error) {
      console.log("Error!", error)
      return res.status(500).json(error)
    }
  }
}

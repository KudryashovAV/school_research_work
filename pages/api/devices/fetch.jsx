import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    const allDevices = await prisma.device.findMany({})
    return res.status(200).json(allDevices)
  } catch (error) {
    console.log("Error!", error)
    return res.status(500).json(error)
  }
}

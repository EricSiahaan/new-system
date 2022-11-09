const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createKendaraan = async function (req, res, next) {
    try {
        const result = await prisma.tablekendaraan.create({
            data: req.body
        });
        res.json({ data: result })
    } catch (e) {
        next(e)
    }
}

exports.getAllKendaraan = async function (req, res) {
    try {

        const kendaraan = await prisma.tablekendaraan.findMany({

            where: {
                deleted_at: null
            },

        });
        res.status(200).json(kendaraan)
    } catch {
        res.json({
            message: "data Tidak ada"
        })
    }

}

exports.getKendaraanById = async function (req, res) {
    try {
        const id = parseInt(req.params.id)
        const kendaraan = await prisma.tablekendaraan.findFirst({
            where: {
                AND: [
                    { id: id },
                    { deleted_at: null }
                ]
            },
        }
        )
        res.status(200).json({
            data: kendaraan
        })
    } catch {
        res.json({
            message: "data Tidak ada"
        })
    }
}

exports.updateKendaraanById = async function (req, res) {
    const id = parseInt(req.params.id)
    const kendaraan = await prisma.tablekendaraan.update({
        where: {
            id: id
        },
        data:
            req.body
    })
    res.json(kendaraan)
}

exports.deleteKendaraanById = async function (req, res) {
    const id = parseInt(req.params.id)
    const kendaraan = await prisma.tablekendaraan.update({
        where: {
            id: id
        },
        data: {
            deleted_at: new Date()
        }
    })
    res.json({
        data: kendaraan,
        message: "data di tampilkan"
    })
}
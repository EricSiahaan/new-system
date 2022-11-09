const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createPer = async function (req, res, next) {
    try {
        const result = await prisma.tableper.create({
            data: req.body
        });
        res.json({ data: result })
        console.log(result)
    } catch (e) {
        next(e)
    }
}

exports.getAllPer = async function (req, res) {
    const pers = await prisma.tableper.findMany({
        where: { deleted_at: null }
    });
    res.json({
        data: pers,
        message: "data semua di tampilkan"
    })


}

exports.getPerById = async function (req, res) {
    try {
        const id = parseInt(req.params.id)
        const per = await prisma.tableper.findFirst({
            where: {
                AND: [
                    { id: id },
                    { deleted_at: null }
                ]
            },
        }
        )
        res.status(200).json({
            data: per
        })
    } catch {
        res.json({
            message: "data Tidak ada"
        })
    }
}
exports.updatePerById = async function (req, res) {
    const id = parseInt(req.params.id)
    const per = await prisma.tableper.update({
        where: {
            id: id
        },
        data:
            req.body
    })
    res.json(per)
}

exports.deletePerById = async function (req, res) {
    const id = parseInt(req.params.id)
    const per = await prisma.tableper.update({
        where: {
            id: id
        },
        data: {
            deleted_at: new Date()
        }
    })
    res.json(per)
}
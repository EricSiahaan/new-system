const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createAdmin = async function (req, res, next) {
    try {
        const result = await prisma.admin.create({
            data: req.body
        });
        res.json({ data: result })
        console.log(result)
    } catch (e) {
        next(e)
    }
}

exports.getAllAdmin = async function (req, res) {
    const admin = await prisma.admin.findMany({
        where: { deleted_at: null }
    });
    res.status(200).json(admin)

}

exports.getAdminById = async function (req, res) {
    try {
        const id = parseInt(req.params.id)
        const admin = await prisma.admin.findFirst({
            where: {
                AND: [
                    { id: id },
                    { deleted_at: null }
                ]
            },
        }
        )
        res.status(200).json({
            data: admin
        })
    } catch {
        res.json({
            message: "data Tidak ada"
        })
    }
}


exports.updateAdminById = async function (req, res) {
    const id = parseInt(req.params.id)
    const admin = await prisma.admin.update({
        where: {
            id: id
        },
        data:
            req.body
    })
    res.json(admin)
}

exports.deleteAdminById = async function (req, res) {
    const id = parseInt(req.params.id)
    const admin = await prisma.admin.update({
        where: {
            id: id
        },
        data: {
            deleted_at: new Date()
        }
    })
    res.json(admin)
}
const prisma = require("../prisma")

exports.createBan = async function (req, res, next) {
    try {
        const result = await prisma.tableban.create({
            data: req.body
        });
        res.json({ data: result })
        console.log(result)
    } catch (e) {
        next(e)
    }
}

exports.getBanAll = async function (req, res) {
    const bans = await prisma.tableban.findMany({
        where: { deleted_at: null }
    });
    res.json({
        data: bans,
        message: "data di tampilkan"
    })


}

exports.getBanById = async function (req, res) {
    try {
        const id = parseInt(req.params.id)
        const ban = await prisma.tableban.findFirst({
            where: {
                AND: [
                    { id: id },
                    { deleted_at: null }
                ]
            },
        }
        )
        res.status(200).json({
            data: ban
        })
    } catch {
        res.json({
            message: "data Tidak ada"
        })
    }
}


exports.updateBanById = async function (req, res) {
    const id = parseInt(req.params.id)
    const ban = await prisma.tableban.update({
        where: {
            id: id
        },
        data:
            req.body
    })
    res.json(ban)
}

exports.deleteBanById = async function (req, res) {
    const id = parseInt(req.params.id)
    const ban = await prisma.tableban.update({
        where: {
            id: id
        },
        data: {
            deleted_at: new Date()
        }
    })
    res.json(ban)
}
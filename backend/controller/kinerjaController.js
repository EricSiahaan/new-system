const prisma = require("../prisma")

exports.createKinerja = async function (req, res, next) {
    try {
        const result = await prisma.tablekinerja.create({
            data: req.body
        });
        res.json({ data: result })
    } catch (e) {
        next(e)
    }
}

exports.getAllKinerja = async function (req, res) {
    const kinerjas = await prisma.tablekinerja.findMany({
        where: { deleted_at: null }
    });
    res.json({
        data: kinerjas,
        message: "data semua di tampilkan"
    })

}

exports.getKinerjaById = async function (req, res) {
    try {
        const id = parseInt(req.params.id)
        const kinerja = await prisma.tablekinerja.findFirst({
            where: {
                AND: [
                    { id: id },
                    { deleted_at: null }
                ]
            },
        }
        )
        res.status(200).json({
            data: kinerja
        })
    } catch {
        res.json({
            message: "data Tidak ada"
        })
    }
}


exports.updateKinerjaById = async function (req, res) {
    const id = parseInt(req.params.id)
    const kinerja = await prisma.tablekinerja.update({
        where: {
            id: id
        },
        data:
            req.body
    })
    res.json(kinerja)
}

exports.deleteKinerjaById = async function (req, res) {
    const id = parseInt(req.params.id)
    const kinerja = await prisma.tablekinerja.update({
        where: {
            id: id
        },
        data: {
            deleted_at: new Date()
        }
    })
    res.json({
        data: kinerja,
        message: "data di tampilkan"
    })
}
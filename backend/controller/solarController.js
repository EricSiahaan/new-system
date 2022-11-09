const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.createSolar = async function (req, res, next) {
    try {
        const result = await prisma.tablesolar.create({
            data: req.body
        });
        res.json({ data: result })
    } catch (e) {
        next(e)
    }

}


exports.getAllSolar = async function (req, res) {
    try {

        const solars = await prisma.tablesolar.findMany({

            where: {
                deleted_at: null
            },

        });
        res.status(200).json(solars)
    } catch {
        res.json({
            message: "data Tidak ada"
        })
    }
}


exports.getSolarById = async function (req, res) {
    try {
        const id = parseInt(req.params.id)
        const solar = await prisma.tablesolar.findFirst({
            where: {
                AND: [
                    { id: id },
                    { deleted_at: null }
                ]
            },

        }
        )
        res.status(200).json({
            data: solar
        })
    } catch {
        res.json({
            message: "data Tidak ada"
        })
    }
}


exports.updateSolarById = async function (req, res) {
    const id = parseInt(req.params.id)
    const solar = await prisma.tablesolar.update({
        where: {
            id: id
        },
        data:
            req.body,
        // birthDate: new Date(req.body.birthDate)

    })
    res.json(solar)
}

exports.deleteSolarById = async function (req, res) {
    const id = parseInt(req.params.id)
    const solar = await prisma.tablesolar.update({
        where: {
            id: id
        },
        data: {
            deleted_at: new Date()
        }
    })
    res.json(solar)
}
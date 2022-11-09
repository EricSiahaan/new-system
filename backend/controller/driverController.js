const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.createDriver = async function (req, res, next) {

    try {
        const result = await prisma.tabledriver.create({
            data: req.body
            // {
            //     ...req.body,
            //     birthDate: new Date(req.body.birthDate)
            // },




            // data: {
            //     req.body,

            //     // ...req.body,
            //     // birthDate: new Date(req.body.birthDate)

            // }

        });

        res.json({ data: result })
        console.log(result)
    } catch (e) {
        next(e)
    }
}

exports.getAllDriver = async function (req, res) {
    try {

        const drivers = await prisma.tabledriver.findMany({

            where: {
                deleted_at: null
            },

        });
        res.status(200).json(drivers)
    } catch {
        res.json({
            message: "data Tidak ada"
        })
    }
}


exports.getDriverById = async function (req, res) {
    try {
        const id = parseInt(req.params.id)
        const driver = await prisma.tabledriver.findFirst({
            where: {
                AND: [
                    { id: id },
                    { deleted_at: null }
                ]
            },

        }
        )
        res.status(200).json({
            data: driver
        })
    } catch {
        res.json({
            message: "data Tidak ada"
        })
    }
}


exports.updateDriverById = async function (req, res) {
    const id = parseInt(req.params.id)
    const driver = await prisma.tabledriver.update({
        where: {
            id: id
        },
        data:
            req.body,
        // birthDate: new Date(req.body.birthDate)

    })
    res.json(driver)
}

exports.deleteDriverById = async function (req, res) {
    const id = parseInt(req.params.id)
    const driver = await prisma.tabledriver.update({
        where: {
            id: id
        },
        data: {
            deleted_at: new Date()
        }
    })
    res.json(driver)
}
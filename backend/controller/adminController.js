const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
var crypto = require('crypto')

exports.createAdmin = async function (req, res, next) {
    try {
        // encrypt password
        var password = crypto.createHash('sha256').update(req.body.password).digest('base64');

        req.body.password = password;

        // insert data into database
        const result = await prisma.admin.create({
            data: req.body
        });
        res.json({ data: result })
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

exports.login = async function (req, res) {
    try {
        // encrypt password
        var password = crypto.createHash('sha256').update(req.body.password).digest('base64');

        // get data from database
        const admin = await prisma.admin.findFirst({
            where: {
                AND: [
                    { username: req.body.username },
                    { password: password },
                    { deleted_at: null }
                ]
            },
        })
        res.status(200).json({
            data: admin
        })
    } catch {
        res.json({
            message: "data Tidak ada"
        })
    }
}



exports.updatePassword = async function (req, res) {
    const id = parseInt(req.params.id)

    // check existing data
    admin = await prisma.admin.findFirst({
        where: {
            AND: [
                { id: id },
                { deleted_at: null }
            ]
        },
    })

    if (admin == null) {
        return res.json({
            message: "Data admin tidak ditemukan"
        })
    }

    // check current password
    var current_password = crypto.createHash('sha256').update(req.body.current_password).digest('base64');


    console.log(admin)
    if (current_password !== admin.password) {
        return res.json({
            message: "Password tidak match"
        })
    }

    var new_password = crypto.createHash('sha256').update(req.body.new_password).digest('base64');

    admin = await prisma.admin.update({
        where: {
            id: id
        },
        data: {
            password: new_password,
            updated_at: new Date()
        }
    })
    res.json(admin)
}
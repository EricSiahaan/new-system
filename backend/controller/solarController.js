const prisma = require("../prisma")

exports.createSolar = async function (req, res, next) {
    try {
        // convert start date & end date
        var startDate = req.body.startDate;
        var endDate = req.body.endDate;
        
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        
        // get unit time & get days
        var Difference_In_Time = endDate.getTime() - startDate.getTime();
        var difDays = Difference_In_Time / (1000 * 3600 * 24);

        if (difDays != 7) {
            res.json({
                message: "Range antara Start date dan End date harus 7 hari"
            })
            return
        }

        req.body.startDate = startDate
        req.body.endDate = endDate

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
        })

        const driver = await prisma.tabledriver.findFirst({
            where: {
                AND: [
                    { id: solar.driverId },
                    { deleted_at: null }
                ]
            },
        })

        const car = await prisma.tablekendaraan.findFirst({
            where: {
                AND:[
                    { id: solar.carNumber },
                    { deleted_at: null },
                ]
            }
        })

        res.status(200).json({
            data: {
                "solar_detail": solar,
                "driver_detail": driver,
                "car_detail": car,
            }
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

exports.getSolarByDate = async function (req, res) {
    try {
        const startDate = req.query.startDate
        const endDate = req.query.endDate

        let total_rit = 0;
        let total_solar_rest = 0;
        let total_price = 0;

        const solar = await prisma.tablesolar.findMany({
            where: {
                AND: [
                    { 
                        startDate: {
                            lte: endDate,
                            gte: startDate,
                        }, 
                    },
                    { 
                        endDate: {
                            lte: endDate,
                            gte: startDate,
                        },  
                    },
                    { deleted_at: null }
                ]
            },
        })

        const driver = await prisma.tabledriver.findFirst({
            where: {
                AND: [
                    { id: solar.driverId },
                    { deleted_at: null }
                ]
            },
        })

        const car = await prisma.tablekendaraan.findFirst({
            where: {
                AND:[
                    { id: solar.carNumber },
                    { deleted_at: null },
                ]
            }
        })

        for (var i = 0, l = solar.length; i < l; i++) {
            total_rit += solar[i].rit;
            total_solar_rest += solar[i].solarRest;
            total_price += solar[i].price;

        }

        res.status(200).json({
            data: {
                "solar_detail": solar,
                "driver_detail": driver,
                "car_detail": car,
                "total_rit": total_rit,
                "total_solar_rest": total_solar_rest,
                "total_price": total_price,
            }
        })
        res.status(200).json(solars)
    } catch {
        res.json({
            message: "data Tidak ada"
        })
    }
}
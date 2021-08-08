const Order = require('../models/order');
const io = require('socket.io-client');
const socket = io.connect("http://localhost:5000");

exports.searchOrders = async (req, res, next) => {
    console.log(req.body)

    if ((req.body.to_date === '' || req.body.from_date === '' || req.body.status === '' || req.body.userId === '') === false) {
        const from_day = req.body.from_date.substring(0, 2)
        const from_month = req.body.from_date.substring(3, 5)
        const from_year = req.body.from_date.substring(6, 10)

        const from_date = new Date(from_year, JSON.parse(from_month - 1), from_day)

        const to_day = req.body.to_date.substring(0, 2)
        const to_month = req.body.to_date.substring(3, 5)
        const to_year = req.body.to_date.substring(6, 10)


        const to_date = new Date(to_year, JSON.parse(to_month - 1), to_day + 1)

        fetchOrders = await Order.find({
            "status": req.body.status,
            "userId": req.body.userId,
            "date": { $gte: from_date, $lte: to_date }
        }).populate('userId')
            .populate({ path: 'smartphones', populate: { path: 'id' } })

        orderCounter = await Order.countDocuments()
        res.status(201).json({
            message: "Order added successfully",
            order: {
                orders: fetchOrders,
                ordersCount: fetchOrders.length
            }
        })
    }
    else {
        res.status(500).json({
            message: "All fields required",
        })
    }
}


exports.getOrders = async (req, res, next) => {
    console.log("getOrders");
    const status = await Order.aggregate([{ $group: { _id: "$status" } }])
    const dates = await Order.aggregate([{

        $project: {
            daymonthYear: {
                $dateToString: { format: "%d-%m-%Y", date: "$date" }
            }
        }
    }
    ])
    var newDate = [];
    dates.map(date => {
        if (!newDate.includes(date.daymonthYear)) {
            newDate.push(date.daymonthYear)
        }
    })
    const userId = await Order.aggregate([{ $group: { _id: "$userId" } }])
    console.log(newDate)
    const orderQuery = await Order.find()//return all the Orders
        .populate('userId')
        .populate({ path: 'smartphones', populate: { path: 'id' } })
        .then(documents => {
            // console.log(documents)
            fetchedOrders = documents;
            return Order.count() // returns all the number of that match query from this database... we made no filtering so we got all 100 Orders
        }).then(count => {
            res.status(200).json({
                status: status,
                dates: newDate,
                userId: userId,
                message: 'Orders fetch succesfully!',
                orders: fetchedOrders,
                ordersCount: count
            })
        })
}
exports.getOrderByUserId = async (req, res, next) => {
    console.log("getOrderByUserId");
    const status = await Order.aggregate([{ $group: { _id: "$status" } }])

    const dates = await Order.aggregate([{

        $project: {
            daymonthYear: {
                $dateToString: { format: "%d-%m-%Y", date: "$date" }
            }
        }
    }
    ])
    var newDate = [];
    dates.map(date => {
        if (!newDate.includes(date.daymonthYear)) {
            newDate.push(date.daymonthYear)
        }
    })

    console.log(status);
    console.log(newDate);

    const orders = await Order.find({ "userId": req.params.userId }).populate('userId')
        .populate({ path: 'smartphones', populate: { path: 'id' } })
    console.log(orders)

    res.status(200).json({
        status: status,
        dates: newDate,
        orders: orders
    })
}

exports.createOrder = (req, res, next) => {
    const order = new Order({
        smartphones: req.body.smartphones,
        totalPrice: req.body.totalPrice,
        userId: req.body.userId,
        status: req.body.status
    });
    order.save().then(createdOrder => {
        res.status(201).json({
            message: "Order added successfully",
            order: {
                id: createdOrder._id,
                date: createdOrder.date,
                status: createdOrder.status,
            }
        });
        socket.emit('changeOrdersCount'); //WebSocket
    })
        .catch(error => {
            res.status(500).json({
                message: 'Creating a Order failed!',
                error: err,
            });
        });
};

exports.updateOrder = (req, res, next) => {
    console.log('updateOrder');
    Order.updateOne({ _id: req.params.id }, req.body).then(doc => {
        res.status(200).json({
            user: doc,
            message: "your order has been updated"
        })
    })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: 'somthing went wrong!'
            });
        });

}
exports.deleteOrder = (req, res, next) => {
    Order.deleteOne({ _id: req.params.id }).then(result => {
        if (result.n > 0) {
            res.status(200).json({
                message: "Deletion successful!"
            })
            socket.emit('changeOrdersCount'); //WebSocket
        }
        else {
            res.status(401).json({ message: "Not authorized!" });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: "Fetching posts failed!"
            });
        });
}

exports.getTotalAmountByUser = async (req, res, next) => {
    Order.aggregate(
        [
            {
                $group:
                {
                    _id: "$userId",
                    totalSaleAmount: { $sum: { $multiply: ["$smartphones.quantity", "$smartphones.quantity"] } }
                }
            },])
}

exports.getOrdersCount = (req, res, callBack) => {
    console.log("getOrdersCount");

    Order.count({
    }, (err, count) => {
        if (err)
            return res ? res.status(404).json({
                "err": err,
                count: -1
            }) : callBack(-1);

        return res ? res.status(200).json({
            ordersCount: count
        }) : callBack(count);
    });

}

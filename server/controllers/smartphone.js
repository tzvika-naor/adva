const Smartphone = require('../models/smartphone');
const io = require('socket.io-client');
const socket = io.connect("http://localhost:5000");

exports.searchQuery = (req, res, next) => {
                  
    console.log(req.body)
    Smartphone.find({
        $or: [{ brand: req.body.brand }, { display: req.body.display }, { frontCamera: req.body.frontCamera }, { rearCamera: req.body.rearCamera },
         { batteryCapacity: req.body.batteryCapacity }, { price: { $gt: req.body.price } }]
    }).then(documents => {
        console.log(documents)
        res.status(200).json({
            message: 'query succeeded',
            smartphone: documents
        })
    })
        .catch((err) => {
            res.status(500).json({
                message: 'something went wrong ',
                error: err
            })
        })
}

exports.searchByProcessor = (req, res, next) => {
    console.log((req.body))
    Smartphone.find({
        $or: [{ rearCamera: req.body.rearCamera }, { processors: req.body.processor }, { frontCamera: req.body.frontCamera }]
    }).then(documents => {
        res.status(200).json({
            message: 'query succeeded',
            smartphone: documents
        })
    })
        .catch((err) => {
            res.status(500).json({
                message: 'something went wrong ',
                error: err
            })
        })
}

exports.getSmartphones = async (req, res, next) => {
    const brand = []
    const display = []
    const batteryCapacity = []
    const processor = []
    const frontCamera = []
    const rearCamera = []
    const phoneModel = []
    const brands = await Smartphone.aggregate([{ $group: { _id: "$brand" } }])
    brands.map(item => brand.push(item._id))
    const displays = await Smartphone.aggregate([{ $group: { _id: "$display" } }])
    displays.map(item => display.push(item._id))
    const batteryCapacities = await Smartphone.aggregate([{ $group: { _id: "$batteryCapacity" } }])
    batteryCapacities.map(item => batteryCapacity.push(item._id))
    const processors = await Smartphone.aggregate([{ $group: { _id: "$processor" } }])
    processors.map(item => processor.push(item._id))
    const frontCameras = await Smartphone.aggregate([{ $group: { _id: "$frontCamera" } }])
    frontCameras.map(item => frontCamera.push(item._id))
    const rearCameras = await Smartphone.aggregate([{ $group: { _id: "$rearCamera" } }])
    rearCameras.map(item => rearCamera.push(item._id))
    const phoneModels = await Smartphone.aggregate([{ $group: { _id: "$phoneModel" } }])
    phoneModels.map(item => phoneModel.push(item._id))
    const SmartphoneQuery = Smartphone.find();//return all the Smartphone
    SmartphoneQuery.then(documents => {
        fetchedSmartphones = documents;
        return Smartphone.countDocuments() // returns all the number of that match query from this database... we made no filtering so we got all 100 cars
    }).then(count => {
        res.status(200).json({
            message: 'Smartphone fetch succesfully!',
            smartphones: fetchedSmartphones,
            unique: {
                brand: brand,
                display: display,
                batteryCapacity: batteryCapacity,
                processor: processor,
                frontCamera: frontCamera,
                rearCamera: rearCamera,
                phoneModel: phoneModel
            },
            smartphonesCount: count
        })
    })
}
exports.getSmartphone = (req, res, next) => {
    Smartphone.findById(req.params.id).then(document => {
        if (document) {
            res.status(200).json({
                message: 'fetching succeeded',
                Smartphones: document
            })
        } else {
            res.status(404).json({ message: 'Smartphone not found!' });
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Fetching posts failed!',
            error: error
        });
    });
};

exports.createSmartphone = (req, res, next) => {
    console.log(req.body)
    const smartphone = new Smartphone({
        phoneModel: req.body.phoneModel,
        brand: req.body.brand,
        display: req.body.display,
        processor: req.body.processor,
        frontCamera: req.body.frontCamera,
        rearCamera: req.body.rearCamera,
        batteryCapacity: req.body.batteryCapacity,
        price: req.body.price,
        image: req.body.image
    });
    smartphone.save().then(newSmartphone => {
        res.status(201).json({
            message: "Smartphone added successfully",
            Smartphone: {
                phoneModel: newSmartphone.phoneModel,
                brand: newSmartphone.brand,
                display: newSmartphone.display,
                processor: newSmartphone.processor,
                frontCamera: newSmartphone.frontCamera,
                rearCamera: newSmartphone.rearCamera,
                batteryCapacity: newSmartphone.batteryCapacity,
                price: newSmartphone.price,
                image: newSmartphone.image
            }
        });
        socket.emit('changeSmartphonesCount'); //WebSocket
    })
        .catch(error => {
            res.status(500).json({
                message: 'Creating a Smartphone failed!',
                // error: error
            });
        });
};
exports.updateSmartphone = (req, res, next) => {
    console.log(req.boy)
    const smartphone = new Smartphone({
        phoneModel: req.body.phoneModel,
        brand: req.body.brand,
        display: req.body.display,
        processor: req.body.processor,
        frontCamera: req.body.frontCamera,
        rearCamera: req.body.rearCamera,
        batteryCapacity: req.body.batteryCapacity,
        price: req.body.price,
        image: req.body.image
    });
    smartphone._id = req.params.id;
    Smartphone.updateOne({ _id: req.params.id }, smartphone).then(result => {
        if (result.n > 0) {
            res.status(200).json({
                message: "update successful!"
            })
        } else {
            res.status(401).json({
                message: "Not authorized!"
            });
        }
    });
}
exports.deleteSmartphone = (req, res, next) => {
    Smartphone.deleteOne({ _id: req.params.id }).then(result => {
        if (result.n > 0) {
            res.status(200).json({
                message: "Deletion successful!"
            })
            socket.emit('changeSmartphonesCount'); //WebSocket
        } else {
            res.status(401).json({ message: "Not authorized!" });
        }
    })
        .catch(error => {
            res.status(500).json({
                message: "Fetching posts failed!"
            });
        });
}

exports.getSmartphonesCount = (req, res, callBack) => {
    console.log("getSmartphonesCount");

    Smartphone.count({
    }, (err, count) => {
        if (err)
            return res ? res.status(404).json({
                "err": err,
                count: -1
            }) : callBack(-1);

        return res ? res.status(200).json({
            smartphonesCount: count
        }) : callBack(count);
    });

}

  //                         brand   display  frontCamera  rearCamera batteryCapacity price
    //brand             21         
    //display           31      651     
    //frontCamera       41      861     1271            
    //rearCamera        51      1071    1581       2091              
    //batteryCapacity   61      1281    1891       2501       3111                       
    //price             71      1491    2201       2911       3621         4331 

    // exports.searchQuery = (req, res, next) => {
    //     var minPrice = '';
    //     var reviews = parseInt(req.body.reviews.substring(1,2));
    //     const tmpMinPrice = req.body.minPrice;
    //     if (tmpMinPrice.substring(1) === '+')
    //         minPrice = tmpMinPrice.substring(0, 1);
    //     if (tmpMinPrice.substring(2) === '+')
    //         minPrice = tmpMinPrice.substring(0, 2);
    //     if (tmpMinPrice.substring(3) === '+'){
    //         minPrice = tmpMinPrice.substring(0, 3);
    //     }
    //     minPrice = parseInt(minPrice);

    //     Smartphone.find({
    //         category: req.body.category, price: { $gt: minPrice }, reviews: { $gt: reviews },
    //     }).sort({ price: req.body.orderBy }).then(documents => {
    //             res.status(200).json({
    //                 message: 'query succeeded',
    //                 Smartphones: documents
    //             })
    //         })
    //         .catch((err) => {
    //             res.status(500).json({
    //                 message: 'something went wrong ',
    //                 error: err
    //             })
    //         })
    // }
    // exports.getCategory = (req, res, next) => {
    //     const SmartphoneQuery = Smartphone.find();//return all the Smartphone
    //     SmartphoneQuery.then(documents => {
    //         fetchedSmartphones = documents;
    //         categories = fetchedSmartphones.map((Smartphone) => {
    //             return Smartphone.category
    //         })
    //         uniqCategories = [...new Set(categories)]; //this is the same as group by
    //         return Smartphone.countDocuments() // returns all the number of that match query from this database... we made no filtering so we got all 100 cars
    //     }).then(count => {

    //         res.status(200).json({
    //             message: 'Smartphone fetch succesfully!',
    //             category: uniqCategories
    //         })
    //     })

    // }
    // exports.getReviews = (req, res, next) => {
    //     const SmartphoneQuery = Smartphone.find();//return all the Smartphone
    //     SmartphoneQuery.then(documents => {
    //         console.log(documents)
    //         fetchedSmartphones = documents;
    //         reviews = fetchedSmartphones.map((Smartphone) => {
    //             return Smartphone.reviews
    //         })
    //         uniqueReviews = [...new Set(reviews)]; //this is the same as group by
    //         sortedReviews = uniqueReviews.sort(function (a, b) {
    //             return a - b;
    //         });
    //     }).then(count => {
    //         // console.log(count)
    //         res.status(200).json({
    //             message: 'Smartphone fetch succesfully!',
    //             reviews: sortedReviews,
    //             notUnique: reviews
    //         })
    //     })
    // }
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
// const page_url = 'https://gadgets.ndtv.com/mobiles/smartphones'
const page_url = ['https://gadgets.ndtv.com/mobiles/smartphones?facet[brand]=Samsung&sort=popularity_score&order=desc', 'https://gadgets.ndtv.com/mobiles/smartphones?facet[brand]=Oppo&sort=popularity_score&order=desc'
    , 'https://gadgets.ndtv.com/mobiles/smartphones?facet[brand]=Xiaomi&sort=popularity_score&order=desc']
// 'https://gadgets.ndtv.com/mobiles/smartphones?facet[brand]=Vivo&sort=popularity_score&order=desc', 'https://gadgets.ndtv.com/mobiles/smartphones?facet[brand]=Apple&sort=popularity_score&order=desc']
const Smartphone = require('./models/smartphone');

async function getMobiles () {
    let allData = {};
    const phoneModels = []
    const imageUrl = []
    const display = []
    const processor = []
    const frontCamera = []
    const rearCamera = []
    const batteryCapacity = []
    const price = []
    arr = []

    for (i = 0;i < 3;i++) {
        let { data } = await axios.get(page_url[i]);
        let $ = cheerio.load(data);
        let table = $('#allplist');

        table.find('div > div._lpdscn > h3 > a').each((i, element) => {

            const phoneModel = $(element).text()
            phoneModels.push(phoneModel)

        })
        table.find('div > div._lpimg > a._lpimga > img').each((i, element) => {
            const image = $(element).attr('src')
            imageUrl.push(image)

        })
        table.find(' tbody > tr:nth-child(1) > td._vltxt').each((i, element) => {
            const screenSize = $(element).text()
            display.push(screenSize)

        })

        table.find('tbody > tr:nth-child(2) > td._vltxt').each((i, element) => {
            const cpu = $(element).text()
            processor.push(cpu)

        })

        table.find('tbody > tr:nth-child(3) > td._vltxt').each((i, element) => {
            const front_camera = $(element).text()
            frontCamera.push(front_camera)

        })
        table.find('tbody > tr:nth-child(4) > td._vltxt').each((i, element) => {
            const rear_camera = $(element).text()
            rearCamera.push(rear_camera)

        })
        table.find('tbody > tr:nth-child(5) > td._vltxt').each((i, element) => {
            const battery_capacity = $(element).text()
            batteryCapacity.push(battery_capacity)

        })
        table.find(' div._lpdscn > div > div._lrtngbuy._flx > div > a._lprc > span:nth-child(1)').each((i, element) => {
            const priceinRupee = $(element).text()
            price.push(priceinRupee)
        })
        phoneModels.forEach((val, i) => {
            let flag = false;
            var obj = {}
            var temp = val.split(' ');
            obj.phoneModel = val;
            obj.image = imageUrl[i];
            if (obj.image === "https://gadgets.ndtv.com/static/mobile/images/spacer.png")
                obj.image = "https://assets.gadgets360cdn.com/content/assets/icons/phone_icon.png?output-quality=80";
            obj.display = display[i];
            obj.processor = processor[i]
            obj.frontCamera = frontCamera[i];
            obj.rearCamera = rearCamera[i];
            if (price[i]) {
                flag = true;
                var indexEnd = (price[i]).length
                obj.price = Math.floor((price[i].substr(2, indexEnd)).replace(',', '') / 73.1411);
            }
            if (batteryCapacity[i].includes('Android')) {
                flag = false;
            }
            else{
                flag = true
                obj.batteryCapacity = batteryCapacity[i]
            }
// 
            obj.brand = temp[0];
            if (obj.phoneModel === 'Infinix Smart 4')
                obj.image = "https://expressmartke.com/wp-content/uploads/2020/09/Infinix-Smart-4-2.1.jpg"
            if (obj.phoneModel === 'Motorola Razr (2019)')
                obj.image = "https://motorolaus.vtexassets.com/arquivos/ids/158446-800-auto?width=800&height=auto&aspect=true"
            if (obj.phoneModel === "Motorola Moto G5 Plus (4GB RAM, 32GB)")
                obj.image = "https://www.91-img.com/pictures/114165-v1-moto-g5-plus-32gb-mobile-phone-large-1.jpg"
            if (obj.phoneModel === "Redmi Note 9 Pro Max (6GB RAM, 128GB)")
                obj.image = "https://images-na.ssl-images-amazon.com/images/I/81u6E5niDiL._SX679_.jpg"
            if (obj.phoneModel === "Motorola Moto G5 Plus")
                obj.image = "https://fdn2.gsmarena.com/vv/bigpic/motorola-moto-g-5g-plus.jpg"
            if (obj.phoneModel === "Realme Narzo 20 Pro")
                obj.image = "https://i.gadgets360cdn.com/products/large/realme-narzo-20-pro-380x800-1600674808.jpg"
            if (obj.phoneModel === "Samsung Galaxy F41")
                obj.image = "https://i1.wp.com/pricebey.com/wp-content/uploads/2020/10/Samsung-Galaxy-F41.jpg?fit=600%2C600&ssl=1"
            if (obj.phoneModel === "Oppo Reno 2F")
                obj.image = "https://www.91-img.com/pictures/135617-v4-oppo-reno-2f-mobile-phone-large-1.jpg?tr=h-330,c-at_max,q-60"
            if (obj.phoneModel === "Realme C15")
                obj.image = "https://i.gadgets360cdn.com/products/large/realme-c15-370x800-1597735244.jpg"
            if (obj.phoneModel === "Realme C3 (4GB RAM, 64GB)")
                obj.image = "https://i.gadgets360cdn.com/products/large/realme-c3-368x800-1580975894.jpg"
            if (flag)
                arr.push(obj)
        }
        )
        // function getData (data) {
        //     console.log(data)
        //     allData = data;
        // }
    }
    //creating a json file / if needed
    //    var fd = fs.writeFile(__dirname + '/smartphones.json', JSON.stringify(allData), function (err) {
    //         if (err) {
    //             return console.log(err);
    //         }
    //         console.log("The file was saved!");
    //     })
    // console.log(arr)
    arr.map(smartphone => {
        const smartPhones = new Smartphone({
            phoneModel: smartphone.phoneModel,
            brand: smartphone.brand,
            display: smartphone.display,
            processor: smartphone.processor,
            frontCamera: smartphone.frontCamera,
            rearCamera: smartphone.rearCamera,
            batteryCapacity: smartphone.batteryCapacity,
            price: smartphone.price,
            image: smartphone.image
        });
        smartPhones.save();
    })
}
module.exports = getMobiles();


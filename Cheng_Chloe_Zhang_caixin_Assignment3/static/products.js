// Chloe and Caixin's products.js
// Borrowed from my Assignement 1 and Assignment 2. Modify from SmartPhoneProducts3.

var products=
[
    {
        "type": "pen",
        "image": "pen.JPG"
    },



    {
        "type": "folder",
        "image": "folder.JPG"
    },



    {
        "type": "notebook",
        "image": "notebook.JPG"
    },

    {
        "type": "accessories",
        "image": "accessories.JPG"
    }

];



var pen =[
    {
        "name": "Pencil",
        "price": 2.00,
        "image": "pencil.JPG"
    },


    {
        "name": "Highlighter",
        "price": 3.00,
        "image": "highlighter.JPG"
    },


    {
        "name": "Gel pen",
        "price": 2.00,
        "image": "gel.JPG"
    }
    
];

var folder = [
    {
        "name": "Basic File Folder",
        "price": 3.00,
        "image": "basicfolder.JPG"
    },

    {
        "name": "Envelope Folder",
        "price": 5.00,
        "image": "plasticeve.JPG"
    },

    {
        "name": "Pocket Folder",
        "price": 6.00,
        "image": "pocket.JPG"
    }

];


var notebook = [
    {
        "name": "College Ruled",
        "price": 3.00,
        "image": "college.JPG"
    },

    {
        "name": "Journey",
        "price": 5.00,
        "image": "journey.JPG"
    },

    {
        "name": "Hardcover",
        "price": 8.00,
        "image": "hardcover.JPG"
    }
];

var accessories = [
    {
        "name": "Eraser",
        "price": 2.00,
        "image": "eraser.JPG"
    },

    {
        "name": "Stapler",
        "price": 5.00,
        "image": "stapler.JPG"
    },

    {
        "name": "Sticky Notes",
        "price": 7.00,
        "image": "sticky.JPG"
    }

]


// create product array
var allProducts = {
    "pen": pen,
    "notebook": notebook,
    "folder": folder,
    "accessories": accessories
}
if (typeof module != 'undefined') {
    module.exports.allProducts = allProducts;   // export the products 
  }

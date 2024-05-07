const mongoose = require('mongoose')

const partNumberSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        maxlength: 1,
        minlength: 1,
        match: /^[A-Z]$/ // Ensures that the code is a single uppercase letter
    },
    index: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return (value > 0 && value < 101); // Revision number cannot be zero
            },
            message: props => `${props.value} is not a valid revision number. Revision number must be greater than zero.`
        }
    },
    CrossEntry: [{
        index : Number,
        Definition: String,
        revisionNumber: Number,
        revisedBy: String
    }]
})

const partNumberCollection = mongoose.model('part_number', partNumberSchema);

module.exports = {
    partNumberCollection,
    createEmpty: (fields) => {
        const partNumber = new partNumberCollection(fields);
        partNumber.save();
    }
}
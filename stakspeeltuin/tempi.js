var data = [{
        "name": "regel1",
        "buzz": 1234,
        "delta": 0.3
    }, {
        "name": "regel2",
        "buzz": 1354,
        "delta": 0.3

    }, {
        "name": "regel3",
        "buzz": 1154,
        "delta": 0.1

    }, {
        "name": "regel4",
        "buzz": 1554,
        "delta": 0.3

    }, {
        "name": "regel5",
        "buzz": 1004,
        "delta": 0.8
    }

]


console.log(data)

// TODO: sort
data.sort(function(a, b) {  return b.buzz - a.buzz; });


console.log(data)
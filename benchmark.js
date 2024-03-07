const Benchmark = require('benchmark');
const { omgopassLogic, vectopassLogic } = require("./src/index");


const parameters = {
    syllablesCount: 3,
    minSyllableLength: 2,
    maxSyllableLength: 3,
    hasNumbers: true,
    titlecased: true,
    separators: "",
    vowels: "aeiouy",
    consonants: "bcdfghjklmnpqrstvwxz"
}


// Create a new benchmark suite
const suite = new Benchmark.Suite;

// Add tests to the suite
suite
    .add('Omgopass Implementation', function () {
        omgopassLogic(parameters);
    })
    .add('Vectopass Implementation', function () {
        vectopassLogic(parameters);
    })
    // Add listeners
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // Run the benchmark
    .run({ 'async': true });

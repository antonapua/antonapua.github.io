
require('./../scss/bundle.scss');

class Car{
  manufacturer(car){
    alert(`i have a ${car}`)
  }
}

const bmw = new Car;
bmw.manufacturer('bmw');

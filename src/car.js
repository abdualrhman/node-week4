class Car{
	constructor(obj){
		this.color = obj.color
		this.manufacturer = obj.manufacturer
		this.model = obj.model 
	}
	get color(){
		return this._color
	}
	set color(color){
		this._color = color
	}

	get manufacturer(){
		return this._manufacturer
	}
	set manufacturer(manufacturer){
		this._manufacturer = manufacturer
	}

	get model(){
		return this._color
	}
	set model(model){
		this._model = model
	}
	 toJSON (){
  	return {
  		color: this.color,
  		manufacturer: this.manufacturer,
  		model: this.model
  	}
  }

  

}

exports.Car = Car
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Car = function () {
	function Car(obj) {
		_classCallCheck(this, Car);

		this.color = obj.color;
		this.manufacturer = obj.manufacturer;
		this.model = obj.model;
	}

	_createClass(Car, [{
		key: "toJSON",
		value: function toJSON() {
			return {
				color: this.color,
				manufacturer: this.manufacturer,
				model: this.model
			};
		}
	}, {
		key: "color",
		get: function get() {
			return this._color;
		},
		set: function set(color) {
			this._color = color;
		}
	}, {
		key: "manufacturer",
		get: function get() {
			return this._manufacturer;
		},
		set: function set(manufacturer) {
			this._manufacturer = manufacturer;
		}
	}, {
		key: "model",
		get: function get() {
			return this._color;
		},
		set: function set(model) {
			this._model = model;
		}
	}]);

	return Car;
}();

exports.Car = Car;
//# sourceMappingURL=car.js.map
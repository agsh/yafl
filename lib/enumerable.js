(function(){

    var TYPE_ARRAY = 0
        , TYPE_OBJECT = 1
        , TYPE_LIST = 2
        , TYPE_NUMBER = 3
        ;

    /**
     * e_ - Enumerable
     * @param object
     * @constructor
     */
    _e = function(object) {
        this._body = object;
        this._pointer = null;
        switch (typeof object) {
            case 'object':
                if (object.length) {
                    this._type = TYPE_ARRAY;
                } else {
                    this._type = TYPE_OBJECT;
                }
                break;
            case 'string':
                var body = this._body.split('..');
                var fstNum = parseInt(body[0].substring(1, body[0].length));
                var sndNum = parseInt(body[1].substring(0, body[1].length-1));
                this._fstNum = fstNum;
                this._sndNum = sndNum;
                this._type = TYPE_LIST;
                break;
            case 'number' :
                this._type = TYPE_NUMBER;
                this._mult = 1;
        }
    };

    _e.prototype.init = function(n) {
        switch (this._type) {
            case TYPE_ARRAY: case TYPE_OBJECT:
            this._pointer = 0;
            break;
            case TYPE_LIST:
                if (this._fstNum > this._sndNum) {
                    throw new Error("first number is less that second : " + this._fstNum + ' < ' + this._sndNum);
                }
                this._pointer = 0;
                break;
            case TYPE_NUMBER:
                this._pointer = 0;
                if (n) {
                    this._mult = n;
                } else {
                    this._mult = 1;
                }

                break;
            default:
                throw new Error("there is no method init for type: " + this._type);
        }
    };

    _e.prototype.value = function() {
        switch (this._type) {
            case TYPE_ARRAY:
                if (this._pointer !== null) {
                    if (this._pointer >= 0 && this._body.length > this._pointer) {
                        return this._body[this._pointer];
                    } else {
                        throw new Error("pointer is out of range");
                    }
                } else {
                    throw new Error("pointer is null");
                }
                break;
            case TYPE_OBJECT:
                if (this._pointer !== null) {
                    if (this._pointer >= 0 && Object.keys(this._body).length > this._pointer) {
                        return this._body[Object.keys(this._body)[this._pointer]];
                    } else {
                        throw new Error("pointer is out of range");
                    }

                } else {
                    throw new Error("pointer is null");
                }
                break;
            case TYPE_LIST:
                if (this._pointer !== null) {
                    if (this._pointer >= 0 && this._sndNum > this._pointer) {
                        return this._fstNum + this._pointer;
                    }
                } else {
                    throw new Error("pointer is null");
                }
                break;
            case TYPE_NUMBER:
                if (this._pointer !== null) {
                    return (this._body + this._pointer * this._mult);
                }
                break;
            default:
                throw new Error("there is no method value for type: " + this._type);
        }
    };

    _e.prototype.next = function() {
        switch (this._type) {
            case TYPE_ARRAY:
                if (this._pointer !== null) {
                    this._pointer += 1;
                    if (this._pointer >= this._body.length) {
                        this._pointer = null;
                    }
                    return this._pointer;
                } else {
                    throw new Error("pointer is null");
                }
                break;
            case TYPE_OBJECT:
                if (this._pointer !== null) {
                    this._pointer += 1;
                    if (this._pointer >= Object.keys(this._body).length) {
                        this._pointer = null;
                    }
                    return this._pointer;
                } else {
                    throw new Error("pointer is null");
                }
                break;
            case TYPE_LIST:
                if (this._pointer !== null) {
                    this._pointer += 1;
                    if (this._pointer + this._fstNum - 1 >= this._sndNum) {
                        this._pointer = null;
                    }
                    return this._pointer;
                } else {
                    throw new Error("pointer is null");
                }
            case TYPE_NUMBER:
                if (this._pointer !== null) {
                    this._pointer += 1;
                    return this._pointer;
                } else {
                    throw new Error("pointer is null");
                }
            default:
                throw new Error("there is no method next for type: " + this._type);
        }
    };

    _e.prototype.forEach = function(func) {
        this.init();
        while (this._pointer !== null) {
            func(this.value());
            this.next();
        }
    };

    _e.prototype.foldl = function(func, acc) {
        this.init();
        while (this._pointer !== null) {
            acc = func(acc, this.value());
            this.next();
        }
        return acc;
    };

    _e.prototype.foldr = function(func, acc) {
        this.init();
        var rec = function(obj) {
            if (obj._pointer !== null) {
                var o = obj.value();
                obj.next();
                return func(o, rec(obj));
            } else {
                return acc;
            }
        };
        return rec(this);
    };

    _e.prototype.map = function(func) {
        var result = [];
        this.init();
        while (this._pointer !== null) {
            result.push(func(this.value()));
            this.next();
        }
        return result;
    };

	_e.prototype.filter = function(func) {
		var result = [];
		this.init();

		return result;
	};

	_e.prototype.toArray = function() {
		var result = [];
		this.init();
		while (this._pointer !== null) {
			result.push(this.value());
			this.next();
		}
		return result;
	};

}).call(this);

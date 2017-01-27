class Bill {
    constructor(data) {
        this.name = '';
        this.date_due = '';
        this.value = 0;
        this.done = false;
        Object.assign(this, data);
    }
    
    toJSON() {
        return {
            name: this.name,
            date_due: this.date_due,
            value: this.value,
            done: this.done
        };
    }
}
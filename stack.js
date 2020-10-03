
export { Stack }

class Stack{
    constructor(){
        this.size = 0;
        this.buffer = 4;
        this.stack = [];
    }

    // This function will clear the stack
    clear(){
        this.size = 0;
        this.stack = [];
    }


    // This function will check whether the stack is empty or not
    isEmpty(){
        return  ( this.size === 0 );
    }

    // This function will return the top element of the stack
    top(){
        return this.stack[this.size-1];
    }


    // pop function will remove(delete) the top element if the stack is not empty.
    pop(){
        if(!this.isEmpty()) {
            this.size--;
            return this.stack.pop();
        } else{
            // custom defined null value for pop operation if the stack is already empty.
            return [-1,''];
        }
    }

    // push operation for inserting new elements in the stack.
    push(type, char){

        // If the stack is empty and the opeation is insert (type=0).
        if(this.isEmpty()){
            if(type===0)
                this.stack.push([type, char]);
        } else{
            // tmp will now have the top element.
            let tmp = this.top();
            
            // Check if the top element operation and current operation is same or not.
            // Also we check is the buffer length of the top element is not full then 
            // only we can append a new element in that.
             
            if(tmp[0]===type && tmp[1].length < this.buffer){
                let top = this.pop();
                top[1] = char + top[1];
                this.stack.push(top);
            } 
            
            // Last case when the operation is different(type) or the buffer of previous 
            // top is full then we add new element at the top of the stack.
            
            else{
                this.stack.push([type, char]);
            }
        }
        this.size++;
    }
}
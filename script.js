
import { Stack } from './stack.js';

// This event prevents the user from using the ctrl operations(ctrl+c, ctrl+v)
document.onkeydown = function(event) {
    if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
    }
};

onload = function () {
    // Get reference to elements
    const textbox = document.getElementById('comment');
    const undo = document.getElementById('undo');
    const clear = document.getElementById('clear');
    const temptext = document.getElementById('temptext');

    // textbox is the writing here for the editor
    textbox.value = "";

    // text is the varible we have created to store the string (of textbox)
    let text = "";

    // stack object created
    let stack = new Stack();

    // To avoid user from writing in between the string in the textbox
    // User can only write at the start or at the end of the string.
    textbox.onclick = function () {
        textbox.selectionStart = textbox.selectionEnd = textbox.value.length;
    };


    // Function assosciated with the clear button (event -> onclick)
    clear.onclick = function () {
        stack.clear();
        text = "";
        textbox.value = "";
        temptext.innerHTML = "Sequence of operations will be shown here !";
    };


    // Function that detects the event whether we are inserting or deleting.
    textbox.oninput = function(event){
        //console.log(event);
        switch(event.inputType){
            case "insertText":
                stack.push(0, event.data);
                break;
            case "deleteContentBackward":
                stack.push(1, text[text.length-1]);
                break;
        }

        // Operations are written the temptext HTML
        temptext.innerHTML = "On stack "+stack.top()+"<br>"+temptext.innerHTML;
        text = textbox.value;
    };


    // Function for the undo operations ( Insertion and Deletion )
    undo.onclick = function () {
        // top element is stored in the operation variable
        let operation = stack.pop();

        // Checking whether the stack is empty
        if(operation[0]!==-1){
            temptext.innerHTML = "Performing undo operation<br>"+temptext.innerHTML;
            
            // Check for the insertion operation (type-0)   
            if(operation[0] === 0){
                let len = operation[1].length;

               // removing the characters of as much length as inserted in the previous insert operation	

                textbox.value = textbox.value.substring(0,textbox.value.length-len);
            } 
            
            // Case for deletion thus here we just add/append the deleted element to the textbox value1

            else{
                textbox.value += operation[1];
            }
            text = textbox.value;
        }
    };
};
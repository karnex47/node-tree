export default function(el, event) {
    const rect = el.getBoundingClientRect();
    
    return {
        x: event.pageX - rect.left,
        y: event.pageY - rect.top,
    }
}
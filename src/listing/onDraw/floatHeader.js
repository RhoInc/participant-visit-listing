export default function floatHeader() {
    this.wrap
        .on('scroll', function() {
            const thead = this.querySelector('thead');
            thead.style.transform = `translate(0,${this.scrollTop}px)`;
        });
}

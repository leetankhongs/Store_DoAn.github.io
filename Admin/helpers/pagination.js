module.exports.makePagination = (min, currentPage, max, totalPages, link) => {
    let prev = currentPage - 1;
    let next = currentPage + 1;
    let string = '';
    if(prev < 0) {prev = 0};
    if(next >= totalPages) {next = totalPages - 1};
    string += `<li class="page-item"><a class="page-link" href="${link}?currentPage=${prev + 1}">Previous</a></li>`;
    for(let i = min; i <= max; i++) {
        string += `<li class="page-item"><a class="page-link" href="${link}?currentPage=${i + 1}">${i+1}</a></li>` 
    }
    string += `<li class="page-item"><a class="page-link" href="${link}?currentPage=${next + 1}">Next</a></li>`;
    return string;
};
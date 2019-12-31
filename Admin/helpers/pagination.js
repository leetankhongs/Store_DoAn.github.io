module.exports.makePagination = (min, currentPage, max, totalPages, link, query) => {
    let prev = currentPage - 1;
    let next = currentPage + 1;
    let string = '';
    if(prev < 0) {prev = 0};
    if(next >= totalPages) {next = totalPages - 1};

    //Set query
    const prevQuery = query ? query + `&currentPage=${prev + 1}` : `?currentPage=${prev + 1}`;
    const nextQuery = query ? query + `&currentPage=${next + 1}` : `?currentPage=${next + 1}`;

    string += `<li class="page-item"><a class="page-link" href="${link}`+ prevQuery +`">Previous</a></li>`;
    for(let i = min; i <= max; i++) {
        const currentQuery = query ? query + `&currentPage=${i + 1}` : `?currentPage=${i + 1}`;
        string += `<li class="page-item"><a class="page-link" href="${link}`+currentQuery+`">${i+1}</a></li>` 
    }
    string += `<li class="page-item"><a class="page-link" href="${link}`+ nextQuery +`">Next</a></li>`;
    return string;
};
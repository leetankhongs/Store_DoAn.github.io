module.exports.makeListItemState = (deleteState) => {
    let Activity = {Display:'Tồn tại', appearance: 'pd'};
    if(deleteState === true) {
        Activity.Display = 'Không tồn tại';
        Activity.appearance = 'ds';
    }
    const string = `<button class="${Activity.appearance}-setting" name="activityState" value=${!deleteState}>${Activity.Display}</button>`;
    return string;
} 

module.exports.makeOrdersListItemState = (orderState) => {
    let Order = {Display: 'Đã giao', appearance: 'pd'};
    switch(orderState) {
        case 0: Order.Display = "Chưa giao"; Order.appearance = "ds"; break;
        case 1: Order.Display = "Đang giao"; Order.appearance = "ps"; break;
        case 2: break; 
    }
    const string = `<button type="button" class="${Order.appearance}-setting" name="orderState" value=${orderState}>${Order.Display}</button>`;
    return string;
}
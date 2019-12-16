module.exports.makeListItemState = (deleteState) => {
    let Activity = {Display:'Tồn tại', appearance: 'pd'};
    if(deleteState === true) {
        Activity.Display = 'Không tồn tại';
        Activity.appearance = 'ds';
    }
    const string = `<button class="${Activity.appearance}-setting" name="activityState" value=${!deleteState}>${Activity.Display}</button>`;
    return string;
} 
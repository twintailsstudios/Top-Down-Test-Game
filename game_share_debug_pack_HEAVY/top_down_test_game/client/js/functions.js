////supposed to update HUD...not sure this is working right...////
function update_hud() {
    playerCount = (Object.keys(remote_players).length);
    if (playerCount <= 0) {
        playerCountText.setText('Multiplayer server offline');
    } else {
        playerCountText.setText('Players: ' + (Object.keys(remote_players).length));
    }
}
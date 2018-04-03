////supposed to update HUD...not sure this is working right...////
function update_hud() {
	variableGroup.playerCount = (Object.keys(remote_players).length);
	if (variableGroup.playerCount <= 0) {
		variableGroup.playerCountText.setText('Multiplayer server offline');
	} else {
		variableGroup.playerCountText.setText('Players: ' + (Object.keys(remote_players).length));
	}
}
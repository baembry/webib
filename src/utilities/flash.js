export async function flashMessage(message, alertClass, milleseconds) {
  await this.setState({ flashData: { showFlash: true, message, alertClass } });
  setTimeout(() => {
    this.setState({
      flashData: { showFlash: false, message: "", alertClass: "" }
    });
  }, milleseconds);
}

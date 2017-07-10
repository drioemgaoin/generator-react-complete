function App () {
    this.title = 'App';
}

App.prototype.start = function () {
  console.log('Start ' + this.title);
};

module.exports = App;
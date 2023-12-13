export default class WebWorker {
  constructor(worker, options = {}) {
    const code = worker.toString();
    const blob = new Blob(["(" + code + ")()"]);
    return new Worker(URL.createObjectURL(blob), options);
  }
}

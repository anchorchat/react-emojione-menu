import _ from 'underscore';

class Storage {
  static storeItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('Error while saving to localStorage.', err);
    }
  }

  static getItem(key) {
    let item = null;

    try {
      item = JSON.parse(localStorage.getItem(key));
    } catch (err) {
      console.warn('Error while retrieving item from localStorage.', err);
    }

    return item;
  }

  storeEmoji(emoji) {
    const key = 'recent-emoji';
    const storedEmojis = this.getEmojis();
    let value;

    if (
      storedEmojis &&
      _.find(storedEmojis, storedEmoji => storedEmoji.shortname === emoji.shortname)
    ) {
      return false;
    }

    if (!storedEmojis) {
      value = [emoji];
    }

    if (
      storedEmojis &&
      !_.find(storedEmojis, storedEmoji => storedEmoji.shortname === emoji.shortname)
    ) {
      storedEmojis.unshift(emoji);
      value = storedEmojis;
    }

    if (value.length > 42) {
      value.pop();
    }

    this.constructor.storeItem(key, value);

    return false;
  }

  getEmojis() {
    return this.constructor.getItem('recent-emoji');
  }
}

export default Storage;

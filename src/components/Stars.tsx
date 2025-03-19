import { Component } from 'preact';
import {StarsProps} from '../types';

class Stars extends Component<StarsProps> {
  ratings = [1,2,3,4,5]

  render({size, rating, onSelectRating}: StarsProps) {
    return (
      <div>
      {this.ratings.map(v =>
        <span class={(rating<v ? 'star star-off' : 'star') + ` ${size || 'small-font'}`} data-value={v} onClick={e => !onSelectRating || onSelectRating(e, v)}>&#9733;</span>
      )}
      </div>
    );
  }
}

export default Stars;
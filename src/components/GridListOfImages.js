import React, {Component} from "react";
import ImageCard from "./ImageCard";
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => {
    return {
        gridImages: {
            display: 'flex',
            flexWrap: 'wrap',
            maxWidth: 1100,
            margin: [[0, 'auto']],
        },
    }
};

class GridListOfImages extends Component {
    constructor(props) {
        super(props);

        this.imagesList = React.createRef();
    }

    state = {
        widthBlockListImages: 0
    };

    static propTypes = {
        listOfImages: PropTypes.object.isRequired,

        // withStyles
        classes: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.setState({
            widthBlockListImages: this.imagesList.current.offsetWidth
        });

        window.addEventListener('resize', this.onResize);
    }

    onResize = () => {
        this.setState({
            widthBlockListImages: this.imagesList.current.clientWidth
        })
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    render() {
        const {classes} = this.props;

        return (
            <main
                className={classes.gridImages}
                ref={this.imagesList}
            >
                {this.getListImages()}
            </main>
        );
    }

    getListImages() {
        const {listOfImages} = this.props;
        const images = [];

        listOfImages.forEach((value, key) => {
            const {smallImageData} = value;

            return images.push({
                src: smallImageData.url,
                width: smallImageData.width,
                height: smallImageData.height,
                id: key,
                data: value
            });
        });

        const listAdaptiveSizeImage = this.adaptiveSizeImage(images);

        return listAdaptiveSizeImage.map(imageData => (
            <ImageCard imageData={imageData} key={imageData.id}/>
        ));
    }

    // TODO: add comments
    adaptiveSizeImage(images, perRow = 3, gap = 30) {
        const newImagesSize = [];
        const totalPadding = gap * (perRow - 1);
        const width = this.state.widthBlockListImages - totalPadding;
        const count = images.length;
        const fullRowsCount = Math.floor(count / perRow);
        const countInFullRows = perRow * fullRowsCount;
        const countInLastRow = count - countInFullRows;
        const lastRowPart = countInLastRow / perRow;
        const lastRowTotalPadding = gap * (countInLastRow - 1);
        const lastRowWidth = this.state.widthBlockListImages * lastRowPart - lastRowTotalPadding;

        for (let i = 0; i < countInFullRows; i += perRow) {
            this.adaptiveSizeImagesRow(images, i, i + perRow, width, newImagesSize);
        }
        this.adaptiveSizeImagesRow(images, countInFullRows, count, lastRowWidth, newImagesSize);
        return newImagesSize;
    }

    adaptiveSizeImagesRow = (images, i1, i2, width, newImagesSize) => {
        let sumWidthImage = 0;

        for (let i = i1; i < i2; i++) {
            const image = images[i];
            sumWidthImage += image.width / image.height;
        }

        let zoomIn = width / sumWidthImage;

        for (let i = i1; i < i2; i++) {
            const image = images[i];
            newImagesSize.push({
                ...image,
                width: (image.width / image.height) * zoomIn,
                height: zoomIn
            });
        }
    }
}

export default withStyles(styles)(GridListOfImages);

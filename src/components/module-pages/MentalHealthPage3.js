import '../../App.css';
import MentalHealthModuleFooter from '../MentalHealthModuleFooter';
import MentalHealthModuleMenu from '../MentalHealthModuleMenu';
import MentalHealthModuleLinks from '../MentalHealthModuleLinks';

const MentalHealthPage3 = (props) => {
  const { setLocale, currentIndex, setCurrentIndex, data } = props;

  function fetchCoverImageURL(data) {
    const coverImageComponent = data.mediaComponents.find(
      (mediaComponent) => mediaComponent.__component === 'media.cover-image'
    );
    return `http://localhost:1337${coverImageComponent.coverImage.data.attributes.url}`;
  }

  function fetchTextBlocks(data) {
    return data.textComponents.filter(
      (textComponent) => textComponent.__component === 'content.text-block'
    );
  }

  function renderHeadings(text, level) {
    switch (level) {
      case 1:
        return <h1 className="textBlock">{text}</h1>;
      case 2:
        return <h2 className="textBlock">{text}</h2>;
      case 3:
        return <h3 className="textBlock">{text}</h3>;
      case 4:
        return <h4 className="textBlock">{text}</h4>;
      case 5:
        return <h5 className="textBlock">{text}</h5>;
    }
  }

  function renderList(contentObj) {
    return (
      <ul className="list">
        {contentObj.children.map((listItem) => {
          return <li>{listItem.children[0].text}</li>;
        })}
      </ul>
    );
  }

  const textBlocks = fetchTextBlocks(data);

  return (
    <div className="mental-health-page-container">
      <MentalHealthModuleMenu setLocale={setLocale}></MentalHealthModuleMenu>
      <div className="mental-health-page">
        <h1>Mental Health Module</h1>
        <div className="image">
          <img src={fetchCoverImageURL(data)} alt="cover-image" />
        </div>
        <h2>{data.title}</h2>
        {textBlocks.map((textBlock) => {
          return (
            <div className="textContent">
              {textBlock.content.map((contentObj) => {
                const { type } = contentObj;

                if (type == 'heading') {
                  const children = contentObj.children[0];
                  return renderHeadings(children.text, contentObj.level);
                }

                if (type == 'paragraph') {
                  const children = contentObj.children[0];

                  let className = 'textBlock';
                  className = children.bold ? `${className} bold` : className;
                  className = children.italic
                    ? `${className} italic`
                    : className;
                  className = children.underline
                    ? `${className} underline`
                    : className;

                  return <div className={className}>{children.text}</div>;
                }

                if (type == 'list') {
                  return renderList(contentObj);
                }
              })}
            </div>
          );
        })}
        <MentalHealthModuleFooter
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        ></MentalHealthModuleFooter>
      </div>
      <MentalHealthModuleLinks
        setCurrentIndex={setCurrentIndex}
      ></MentalHealthModuleLinks>
    </div>
  );
};

export default MentalHealthPage3;

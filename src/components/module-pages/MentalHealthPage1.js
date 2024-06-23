import '../../App.css';
import MentalHealthModuleFooter from '../MentalHealthModuleFooter';
import MentalHealthModuleMenu from '../MentalHealthModuleMenu';
import MentalHealthModuleLinks from '../MentalHealthModuleLinks';
import MentalHealthSurvey from '../form/MentalHealthSurvey';

const MentalHealthModulePage = (props) => {
  const {
    loggedIn,
    setLocale,
    currentIndex,
    setCurrentIndex,
    moduleTitle,
    data,
  } = props;

  function fetchCoverImageURL(data) {
    const coverImageComponent = data.mediaComponents.find(
      (mediaComponent) => mediaComponent.__component === 'media.cover-image'
    );
    return coverImageComponent
      ? `http://localhost:1337${coverImageComponent.coverImage.data.attributes.url}`
      : null;
  }

  function fetchVideoURL(data) {
    const videoComponent = data.mediaComponents.find(
      (mediaComponent) => mediaComponent.__component === 'media.video'
    );
    return videoComponent ? videoComponent.URL : null;
  }

  function fetchTextBlocks(data) {
    return data.textComponents.filter(
      (textComponent) => textComponent.__component === 'content.text-block'
    );
  }

  function fetchFormComponent(data) {
    return data.textComponents.find(
      (textComponent) => textComponent.__component === 'content.form'
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

  const formComponent = fetchFormComponent(data);
  const coverImageURL = fetchCoverImageURL(data);
  const videoURL = fetchVideoURL(data);
  const textBlocks = fetchTextBlocks(data);

  return (
    <div className="mental-health-page-container">
      <MentalHealthModuleMenu setLocale={setLocale}></MentalHealthModuleMenu>
      <div className="mental-health-page">
        <h1>{moduleTitle}</h1>

        {coverImageURL && (
          <div className="image">
            <img src={fetchCoverImageURL(data)} alt="cover-image" />
          </div>
        )}

        <h2>{data.title}</h2>

        {textBlocks.length > 0 &&
          textBlocks.map((textBlock) => {
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

        {formComponent && (
          <MentalHealthSurvey
            loggedIn={loggedIn}
            form={fetchFormComponent(data)}
          ></MentalHealthSurvey>
        )}

        {videoURL && (
          <div className="youtubeVideo">
            <iframe
              width="560"
              height="315"
              src={videoURL}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}
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

export default MentalHealthModulePage;

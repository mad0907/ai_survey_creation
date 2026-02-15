const SAMPLE_CONFIG = {
    title: "Test Survey Form",
    description: "Auto generated test form",
    linkSheet: true,
    questions: [
      {type:"short", title:"Your Name?", required:true},
      {type:"paragraph", title:"Feedback", required:false},
      {type:"mcq", title:"Favorite Color?", options:["Red","Blue","Green"], required:true},
      {type:"checkbox", title:"Skills", options:["JS","Python","AI"], required:false},
      {type:"dropdown", title:"Country", options:["India","USA","UK"], required:true},
      {type:"file", title:"Upload Resume"},
      {type:"linear", title:"Rate Session", min:1, max:5},
      {type:"rating", title:"Overall Rating"},
      {type:"mcq_grid", title:"Tech Knowledge", rows:["AI","Cloud"], cols:["Good","Average","Poor"]},
      {type:"checkbox_grid", title:"Tools Used", rows:["VSCode","Git"], cols:["Daily","Weekly"]},
      {type:"date", title:"Joining Date"},
      {type:"time", title:"Preferred Time"}
    ]
  };
  
  function createFormFromConfig(config) {
    if (!config || !Array.isArray(config.questions)) {
      throw new Error("Invalid config: questions missing");
    }
  
    const form = FormApp.create(config.title || "Untitled Form");
    form.setDescription(config.description || "");
  
    config.questions.forEach(q => {
      if (!q || !q.type || !q.title) {
        Logger.log("Skipping invalid question: " + JSON.stringify(q));
        return;
      }
      addQuestion(form, q);
    });
  
    let sheetUrl = null;
    if (config.linkSheet) {
      sheetUrl = linkResponseSheet(form);
    }
  
    return {
      formLink: form.getPublishedUrl(),
      editLink: form.getEditUrl(),
      sheetLink: sheetUrl
    };
  }
  
  function addQuestion(form, q) {
    if (!q) return;
    switch(q.type) {
      case "short": addShort(form, q); break;
      case "paragraph": addParagraph(form, q); break;
      case "mcq": addMCQ(form, q); break;
      case "checkbox": addCheckbox(form, q); break;
      case "dropdown": addDropdown(form, q); break;
      case "file": addFileUpload(form, q); break;
      case "linear": addLinearScale(form, q); break;
      case "rating": addRating(form, q); break;
      case "mcq_grid": addMCQGrid(form, q); break;
      case "checkbox_grid": addCheckboxGrid(form, q); break;
      case "date": addDate(form, q); break;
      case "time": addTime(form, q); break;
    }
  }
  function addShort(form, q){
    form.addTextItem().setTitle(q.title).setRequired(q.required||false);
  }
  function addParagraph(form, q){
    form.addParagraphTextItem().setTitle(q.title).setRequired(q.required||false);
  }
  function addMCQ(form, q){
    form.addMultipleChoiceItem()
        .setTitle(q.title)
        .setChoiceValues(q.options)
        .setRequired(q.required||false);
  }
  function addCheckbox(form, q){
    form.addCheckboxItem()
        .setTitle(q.title)
        .setChoiceValues(q.options)
        .setRequired(q.required || false);
  }
  
  function addDropdown(form, q){
    form.addListItem()
        .setTitle(q.title)
        .setChoiceValues(q.options)
        .setRequired(q.required || false);
  }
  
  function addFileUpload(form, q){
    try {
      if (typeof form.addFileUploadItem === "function") {
        form.addFileUploadItem().setTitle(q.title);
      } else {
        // fallback
        form.addParagraphTextItem()
            .setTitle(q.title + " (Upload Link)");
      }
    } catch(err) {
      Logger.log("File upload not supported");
    }
  }
  
  function addLinearScale(form, q){
    form.addScaleItem()
        .setTitle(q.title)
        .setBounds(q.min||1, q.max||5);
  }
  function addRating(form, q){
    form.addScaleItem().setTitle(q.title).setBounds(1,10);
  }
  function addMCQGrid(form, q){
    form.addGridItem()
        .setTitle(q.title)
        .setRows(q.rows)
        .setColumns(q.cols);
  }
  function addCheckboxGrid(form, q){
    form.addCheckboxGridItem()
        .setTitle(q.title)
        .setRows(q.rows)
        .setColumns(q.cols);
  }
  function addDate(form, q){
    form.addDateItem().setTitle(q.title);
  }
  function addTime(form, q){
    form.addTimeItem().setTitle(q.title);
  }
  
  function linkResponseSheet(form){
    const sheet = SpreadsheetApp.create("Form Responses");
    form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
    return sheet.getUrl();
  }
  function testCreate(){
    const result = createFormFromConfig(SAMPLE_CONFIG);
    Logger.log(result);
  }
  function doPost(e){
    const config = JSON.parse(e.postData.contents);
    const result = createFormFromConfig(config);
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  
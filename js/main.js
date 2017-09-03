jQuery(document).ready(function(){
    jQuery('.skillbar').each(function(){
        jQuery(this).find('.skillbar-bar').animate({
            width:jQuery(this).attr('data-percent')
        },6000);
    });
});

function startPrintProcess(canvasObj, fileName, callback) {
    var width = canvasObj.width;
    var height = canvasObj.height;
    var millimeters = {};
    millimeters.width = Math.floor(width * 0.264583);
    millimeters.height = Math.floor(height * 0.264583);
    var imgData = canvasObj.toDataURL('image/png');
    var pdf = new jsPDF('l', 'mm', 'a4');
    pdf.deletePage(1);
    pdf.addPage(millimeters.width, millimeters.height);
    pdf.addImage(imgData, 'PNG', 0, 0);

    pdfConf = {
            pagesplit: false,
            background: '#fff'
        };
    document.body.appendChild(canvasObj); //appendChild is required for html to add page in pdf
    pdf.addHTML(canvasObj, 0, 0, pdfConf, function() {
        document.body.removeChild(canvasObj);
        pdf.save(fileName + '.pdf');
        callback();
    });
}

$('#print-btn').click(()=>{
    html2canvas(document.getElementById('dom-to-print'), {
    useCORS: true,
    allowTaint: false,
    letterRendering: true,
    logging:true,
        onrendered: function(canvasObj) {
            //canvasObj.style.transform = "rotate(270deg)";
            startPrintProcess(canvasObj,'printPDF',function(){
              //  alert('PDF saved');
            });
        }
    });

})
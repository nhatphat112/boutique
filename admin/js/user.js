$(document).ready(function () {
    let contentUser = `<thead>
    <tr>
      <th> ID </th>
      <th> UserName </th>
      <th> admin </th>
      <th> user</th>
      <th> Confirm</th>
    </tr>
  </thead><tbody>
  `;
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/user/getall"
    })
        .done(function (result) {
            if (result != null && result != "") {
                listUser = result.data;
                $.each(listUser, function (index, currentItem) {
                    if (parseInt(currentItem.roleId) == 1) {
                        contentUser += `
                       <tr>
                        <td> ${currentItem.id} </td>
                        <td>
                          ${currentItem.name}
                        </td>
                        <td>
                          <label class="form-check-label">
                            <input type="radio" name="userid${currentItem.id}" checked> </label>
                        </td>
                        <td>
                          <label class="form-check-label">
  
                            <input type="radio" name="userid${currentItem.id}"></label>
                        </td>
                        <td>
                          <button class="btn btn-facebook">Save</button>
                          </td>
                      </tr>`
                    } else {
                        contentUser += `
                        <tr>
                          <td> ${currentItem.id} </td>
                          <td>
                          ${currentItem.name}
                          </td>
                          <td>
                            <label class="form-check-label">
                              <input type="radio" name="userid${currentItem.id}"></label>
                          </td>
                          <td>
                            <label class="form-check-label">
    
                              <input type="radio" name="userid${currentItem.id}" checked></label>
                          </td>
                          <td>    
                            <button class="btn btn-facebook">Save</button>
                            </td>
                        </tr>`
                    }
                });
                contentUser += `</tbody>`
                $("#user-table").html(contentUser)
                // bootbox.alert("Are u sure")
                
//                 //khi nào trang html nội dung đã được nạp vào trình duyệt
// //thì sẽ chạy code bên trong function
// $(document).ready(function () {
//     //lắng nghe sự kiện click cho thẻ có id là btn-delete-user
//     $(".btn-delete-user").click(function () {
//         var id = $(this).attr("user-id")
//         var This = $(this)
//         $.ajax({
//             method: "GET",
//             url: "http://localhost:8080/demoservlet/user/delete?userId=" + id,
//         }).done(function (result) {
//             This.closest("tr").remove();
//             console.log("Ket qua ", result)
//         });
//     })
// })
            }
            console.log("check detail: done")
        });
})
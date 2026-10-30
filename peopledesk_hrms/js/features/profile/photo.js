/* ---------- profile photo: choose, crop to a square, preview, save or remove ---------- */
const PHOTO_MAX_MB = 5,
  PHOTO_PX = 256;
let photoDraft = null;
function photoBody() {
  const e = me(),
    shown = photoDraft || e.photo;
  return `<div class="ph-up">
    <div class="ph-prev">${shown ? `<img src="${shown}" alt="Photo preview">` : av(e.name, 160)}</div>
    <div class="ph-side">
      <p class="muted small">Use a clear, front-facing photo. JPG, PNG or WebP up to ${PHOTO_MAX_MB} MB. It is cropped to a square.</p>
      <label class="btn" for="ph-file">${ic('download', 15)}Choose photo</label>
      <input id="ph-file" class="sr" type="file" accept="image/jpeg,image/png,image/webp" onchange="photoPick(this.files[0])">
      <div id="ph-err" class="ph-err" role="alert"></div>
    </div>
  </div>`;
}
function photoFoot() {
  const e = me();
  return `${e.photo || photoDraft ? `<button class="btn bad" onclick="photoRemove()">Remove photo</button>` : ''}<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="photoSave()" ${photoDraft ? '' : 'disabled'}>Save photo</button>`;
}
function photoDialog() {
  photoDraft = null;
  overlay('Profile photo', photoBody(), photoFoot(), { keepFocus: !!$('#layer .ov') });
}
function photoRefresh(err) {
  const m = $('#layer .mb'),
    f = $('#layer .mf');
  if (m) m.innerHTML = photoBody();
  if (f) f.innerHTML = photoFoot();
  if (err) $('#ph-err').textContent = err;
}
function photoPick(file) {
  if (!file) return;
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return photoRefresh('Choose a JPG, PNG or WebP image.');
  if (file.size > PHOTO_MAX_MB * 1024 * 1024)
    return photoRefresh(`That file is larger than ${PHOTO_MAX_MB} MB. Choose a smaller photo.`);
  const rd = new FileReader();
  rd.onerror = () => photoRefresh('We could not read that file. Try another photo.');
  rd.onload = () => {
    const img = new Image();
    img.onerror = () => photoRefresh('That file is not a valid image.');
    img.onload = () => {
      const s = Math.min(img.width, img.height),
        c = document.createElement('canvas');
      c.width = c.height = PHOTO_PX;
      c.getContext('2d').drawImage(
        img,
        (img.width - s) / 2,
        (img.height - s) / 2,
        s,
        s,
        0,
        0,
        PHOTO_PX,
        PHOTO_PX
      );
      photoDraft = c.toDataURL('image/jpeg', 0.85);
      photoRefresh();
    };
    img.src = rd.result;
  };
  rd.readAsDataURL(file);
}
function photoSave() {
  if (!photoDraft) return;
  me().photo = photoDraft;
  photoDraft = null;
  audit('Profile photo changed', me().name + ' · ' + me().id);
  persist();
  closeModal();
  render();
  toast('Profile photo updated');
}
function photoRemove() {
  const e = me();
  delete e.photo;
  photoDraft = null;
  audit('Profile photo removed', e.name + ' · ' + e.id);
  persist();
  closeModal();
  render();
  toast('Profile photo removed');
}

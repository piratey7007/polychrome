var te = Object.defineProperty
var se = (o, e, s) => (e in o ? te(o, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (o[e] = s))
var j = (o, e, s) => (se(o, typeof e != 'symbol' ? e + '' : e, s), s)
;(function () {
	const e = document.createElement('link').relList
	if (e && e.supports && e.supports('modulepreload')) return
	for (const l of document.querySelectorAll('link[rel="modulepreload"]')) t(l)
	new MutationObserver((l) => {
		for (const i of l)
			if (i.type === 'childList')
				for (const n of i.addedNodes) n.tagName === 'LINK' && n.rel === 'modulepreload' && t(n)
	}).observe(document, { childList: !0, subtree: !0 })
	function s(l) {
		const i = {}
		return (
			l.integrity && (i.integrity = l.integrity),
			l.referrerpolicy && (i.referrerPolicy = l.referrerpolicy),
			l.crossorigin === 'use-credentials'
				? (i.credentials = 'include')
				: l.crossorigin === 'anonymous'
				? (i.credentials = 'omit')
				: (i.credentials = 'same-origin'),
			i
		)
	}
	function t(l) {
		if (l.ep) return
		l.ep = !0
		const i = s(l)
		fetch(l.href, i)
	}
})()
let O
const le = new Uint8Array(16)
function ie() {
	if (!O && ((O = typeof crypto < 'u' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)), !O))
		throw new Error(
			'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
		)
	return O(le)
}
const C = []
for (let o = 0; o < 256; ++o) C.push((o + 256).toString(16).slice(1))
function oe(o, e = 0) {
	return (
		C[o[e + 0]] +
		C[o[e + 1]] +
		C[o[e + 2]] +
		C[o[e + 3]] +
		'-' +
		C[o[e + 4]] +
		C[o[e + 5]] +
		'-' +
		C[o[e + 6]] +
		C[o[e + 7]] +
		'-' +
		C[o[e + 8]] +
		C[o[e + 9]] +
		'-' +
		C[o[e + 10]] +
		C[o[e + 11]] +
		C[o[e + 12]] +
		C[o[e + 13]] +
		C[o[e + 14]] +
		C[o[e + 15]]
	).toLowerCase()
}
const ne = typeof crypto < 'u' && crypto.randomUUID && crypto.randomUUID.bind(crypto),
	$ = { randomUUID: ne }
function ae(o, e, s) {
	if ($.randomUUID && !e && !o) return $.randomUUID()
	o = o || {}
	const t = o.random || (o.rng || ie)()
	if (((t[6] = (t[6] & 15) | 64), (t[8] = (t[8] & 63) | 128), e)) {
		s = s || 0
		for (let l = 0; l < 16; ++l) e[s + l] = t[l]
		return e
	}
	return oe(t)
}
const re = document.title
function w(o) {
	let e = parseInt(o[0] + o[1], 16) / 255,
		s = parseInt(o[2] + o[3], 16) / 255,
		t = parseInt(o[4] + o[5], 16) / 255,
		l = Math.max(e, s, t),
		i = Math.min(e, s, t),
		n,
		c,
		r = e * 0.299 + s * 0.587 + t * 0.114,
		a = (l + i) / 2
	if (l == i) n = c = 0
	else {
		let u = l - i
		switch (((c = a > 0.5 ? u / (2 - l - i) : u / (l + i)), l)) {
			case e:
				n = (s - t) / u + (s < t ? 6 : 0)
				break
			case s:
				n = (t - e) / u + 2
				break
			default:
				n = (e - s) / u + 4
				break
		}
		n = n * 60
	}
	return { r: e, g: s, b: t, h: n, s: c, l: a, lum: r }
}
function I(o, e, s) {
	o > 360 ? (o -= 360) : o < 0 && (o += 360),
		e > 1 ? (e = 1) : e < 0 && (e = 0),
		s > 1 ? (s = 1) : s < 0 && (s = 0),
		(e *= 100)
	const t = (e * Math.min(s, 1 - s)) / 100,
		l = (i) => {
			const n = (i + o / 30) % 12,
				c = s - t * Math.max(Math.min(n - 3, 9 - n, 1), -1)
			return Math.round(255 * c)
				.toString(16)
				.padStart(2, '0')
		}
	return `${l(0)}${l(8)}${l(4)}`
}
const k = {
		get info() {
			let o = localStorage.getItem('info')
			return o ? JSON.parse(o) : (localStorage.setItem('info', JSON.stringify({ firstVisit: !0 })), this.info)
		},
		set info(o) {
			let e = this.info
			if (o) for (let [s, t] of Object.entries(o)) e[s] = t
			localStorage.setItem('info', JSON.stringify(e))
		},
		get settings() {
			let o = localStorage.getItem('settings')
			return o
				? JSON.parse(o)
				: (localStorage.setItem('settings', JSON.stringify({ lastColorAlgorithmIndex: 2, cookiesOk: !1 })),
				  this.settings)
		},
		set settings(o) {
			let e = this.settings
			if (o) for (let [s, t] of Object.entries(o)) e[s] = t
			localStorage.setItem('settings', JSON.stringify(e))
		},
		savedPalettes: {
			get items() {
				let o = localStorage.getItem('saved-palettes'),
					e
				if (o) {
					let s = []
					e = JSON.parse(o)
					for (let t of e) s.push(t)
					return s
				} else return []
			},
			set items(o) {
				localStorage.setItem('saved-palettes', JSON.stringify(o))
			},
			addItem(o) {
				let e = this.items
				e.push(o), (this.items = e)
			},
			removeItem(o) {
				this.items.splice(o, 1)
			},
		},
	},
	H = {
		create: {
			cmds: [],
			cmdIndex: -1,
			push(o) {
				this.cmds.splice(this.cmdIndex + 1, 1 / 0, o), (this.cmdIndex = this.cmds.length - 1)
			},
			undo() {
				this.cmdIndex > -1 && (this.cmds[this.cmdIndex].undo(), this.cmdIndex--)
			},
			redo() {
				this.cmdIndex < this.cmds.length - 1 && (this.cmdIndex++, this.cmds[this.cmdIndex].redo())
			},
		},
		palettes: {
			cmds: [],
			cmdIndex: -1,
			push(o) {
				this.cmds.splice(this.cmdIndex + 1, 1 / 0, o), (this.cmdIndex = this.cmds.length - 1)
			},
			undo() {
				if (this.cmdIndex > -1) {
					let o = this.cmds[this.cmdIndex]
					this.cmdIndex--, o.undo()
				}
			},
			redo() {
				this.cmdIndex < this.cmds.length - 1 && (this.cmdIndex++, this.cmds[this.cmdIndex].redo())
			},
		},
	}
function U(o, e, s) {
	return (t) => {
		document.title = re + ' | ' + o
		const l = document.querySelector('main.visible')
		l && l.classList.remove('visible')
		const i = e
		if ((i == null || i.classList.add('visible'), o == 'Palettes' && s.draw(k.savedPalettes.items), o == 'Create'))
			if (t) s.generate(t)
			else {
				let n = s.generate(),
					c = []
				for (let r of n) c.push(r.hex)
				history.replaceState('', '', 'PolyChrome' + c.join('-'))
			}
	}
}
const f = (o, e) => Math.random() * (e - o) + o,
	de = () => btoa(parseInt(ae(), 16).toString(36)).replaceAll('=', '')
function E(o, e) {
	const s = document.createElement('div')
	s.classList.add('tooltip', 'appearing')
	const t = document.createElement('h2')
	return (
		(t.innerHTML = o),
		s.append(t),
		e != null && e.pos
			? ((s.style.left = e.pos[0] + 'px'), (s.style.top = e.pos[1] + 'px'))
			: s.classList.add('centered'),
		s.addEventListener(
			'animationend',
			() => {
				s.classList.remove('appearing'),
					setTimeout(() => {
						s.classList.add('disappearing'),
							s.addEventListener(
								'animationend',
								() => {
									s.remove()
								},
								{ once: !0 }
							)
					}, (e == null ? void 0 : e.duration) || 1e3)
			},
			{ once: !0 }
		),
		s
	)
}
function z(o, e) {
	let s = document.createElement('div')
	s.classList.add('popover')
	let t = document.createElement('div')
	if ((t.classList.add('clear-overlay'), (e == null ? void 0 : e.type) == 'menu')) {
		let l = document.createElement('ul')
		l.classList.add('list')
		for (let i of o) {
			let n = document.createElement('div')
			;(n.id = i.id), n.classList.add('choice'), i.content && (n.innerHTML = i.content), l.append(n)
		}
		s.append(l, t)
	} else if ((e == null ? void 0 : e.type) == 'color-picker') {
		let l = document.createElement('canvas')
		;(l.id = 'color-picker'), l.classList.add('color-picker')
		let i = l.getContext('2d'),
			{ h: n } = w(e.hex),
			c = `hsl(${n}, 100%, 50%)`,
			r = i.createLinearGradient(0, 0, i.canvas.width, 0)
		r.addColorStop(0, '#fff'),
			r.addColorStop(1, c),
			(i.fillStyle = r),
			i.fillRect(0, 0, i.canvas.width, i.canvas.height)
		let a = i.createLinearGradient(0, 0, 0, i.canvas.height)
		a.addColorStop(0, 'rgba(0,0,0,0)'),
			a.addColorStop(1, 'black'),
			(i.fillStyle = a),
			i.fillRect(0, 0, i.canvas.width, i.canvas.height)
		let u = document.createElement('div')
		u.classList.add('color-picker-cursor')
		let h = document.createElement('input')
		h.setAttribute('min', '0'), h.setAttribute('max', '360'), h.setAttribute('type', 'range')
		let y = document.createElement('div')
		y.classList.add('huebar')
		let p = document.createElement('div')
		p.classList.add('huebar-cursor')
		let d = document.createElement('input')
		d.setAttribute('min', '0'),
			d.setAttribute('max', '360'),
			d.setAttribute('type', 'range'),
			l.append(u, h),
			y.append(p, d),
			s.append(l, y)
	}
	return s
}
function K(o, e) {
	let s = document.createElement('div')
	s.classList.add('confirmation-screen', o.value + '-confirmation')
	let t = document.createElement('div')
	t.classList.add('box')
	let l = document.createElement('h2')
	l.innerHTML = o.message
	let i = document.createElement('ul'),
		n = document.createElement('div')
	n.classList.add('overlay'), t.append(l, i), s.append(t, n)
	for (let { message: c, value: r, call: a } of e) {
		let u = document.createElement('li')
		;(u.innerHTML = c),
			u.classList.add(r),
			i.append(u),
			u.addEventListener(
				'click',
				() => {
					a && a(), s.remove()
				},
				{ once: !0 }
			)
	}
	document.body.append(s)
}
function J(o, e) {
	let s = document.createElement('div')
	s.classList.add('confirmation-screen', e)
	let t = document.createElement('h2')
	t.innerHTML = o
	let l = document.createElement('textarea'),
		i = document.createElement('div')
	i.classList.add('overlay')
	let n = document.createElement('div')
	n.classList.add('box')
	let c = document.createElement('ul'),
		r = document.createElement('li')
	r.classList.add('yes'), (r.innerHTML = 'Confirm')
	let a = document.createElement('li')
	return (a.innerHTML = 'Cancel'), a.classList.add('no'), c.append(a, r), n.append(t, l, c), s.append(n, i), s
}
function ce() {
	let o = document.createElement('div')
	o.classList.add('confirmation-screen', 'settings-popover')
	let e = document.createElement('div')
	e.classList.add('box')
	let s = document.createElement('div')
	s.classList.add('overlay')
	let t = document.createElement('h2')
	t.innerText = 'Settings'
	let l = document.createElement('ul')
	l.classList.add('options')
	let i = document.createElement('li'),
		n = document.createElement('label')
	n.innerText = 'Algorithm'
	let c = document.createElement('select')
	c.id = 'algorithm'
	let r = document.createElement('option')
	;(r.value = 'random'), (r.innerText = 'Random Algorithm')
	let a = document.createElement('option')
	;(a.value = 'monochromatic'), (a.innerText = 'Monochromatic')
	let u = document.createElement('option')
	;(u.value = 'analogous'), (u.innerText = 'Analogous')
	let h = document.createElement('option')
	;(h.value = 'complementary'), (h.innerText = 'Complementary')
	let y = document.createElement('option')
	;(y.value = 'split-complementary'), (y.innerText = 'Split Complementary')
	let p = document.createElement('option')
	;(p.value = 'triadic'), (p.innerText = 'Triadic')
	let d = document.createElement('option')
	;(d.value = 'tetradic'), (d.innerText = 'Tetradic')
	let b = document.createElement('option')
	;(b.value = 'square'), (b.innerText = 'Square')
	let m = document.createElement('option')
	;(m.value = 'randomize'), (m.innerText = 'Randomize Colors')
	let x = document.createElement('ul')
	x.classList.add('confirmation')
	let v = document.createElement('li')
	v.classList.add('yes'), (v.innerText = 'Confirm')
	let L = document.createElement('li')
	L.classList.add('no'),
		(L.innerText = 'Cancel'),
		x.append(L, v),
		c.append(m, a, u, h, y, p, d, b, r),
		(c.selectedIndex = k.settings.lastColorAlgorithmIndex)
	let S = document.createElement('li')
	S.classList.add('horizontal')
	let T = document.createElement('div'),
		M = document.createElement('label')
	M.innerText = 'Cookies'
	let P = document.createElement('label')
	;(P.innerText = "That's fine!"), P.setAttribute('for', 'cookies-ok')
	let D = document.createElement('label')
	;(D.innerText = 'No thanks.'), D.setAttribute('for', 'cookies-not-ok')
	let Y = document.createElement('div'),
		V = document.createElement('div')
	Y.classList.add('op'), V.classList.add('op')
	let q = document.createElement('input')
	;(q.id = 'cookies-ok'), (q.value = 'cookies-ok'), q.setAttribute('type', 'radio'), q.classList.add('true')
	let B = document.createElement('input')
	return (
		(B.id = 'cookies-not-ok'),
		(B.value = 'cookies-not-ok'),
		B.setAttribute('type', 'radio'),
		B.classList.add('false'),
		k.settings.cookiesOk ? (q.checked = !0) : (B.checked = !0),
		q.addEventListener('change', () => {
			q.checked ? (B.checked = !1) : (B.checked = !0)
		}),
		B.addEventListener('change', () => {
			B.checked ? (q.checked = !1) : (q.checked = !0)
		}),
		Y.append(q, P),
		V.append(B, D),
		S.append(M, T),
		T.append(Y, V),
		i.append(n, c),
		l.append(i, S),
		e.append(t, l, x),
		o.append(s, e),
		o
	)
}
let R = document.querySelector('.saved-palettes-wrapper')
class me {
	constructor() {
		j(this, 'items', [])
		this.items = k.savedPalettes.items
	}
	draw(e) {
		for (; R.childElementCount > 0; ) R.lastChild.remove()
		if (e)
			for (let t = 0; t < e.length; t++) {
				let l = e[t],
					i = document.createElement('div')
				i.setAttribute('data-palette-index', t.toString()), i.classList.add('palette-container')
				let n = document.createElement('div')
				n.classList.add('palette')
				let c = document.createElement('div')
				c.classList.add('options')
				let r = document.createElement('div')
				r.classList.add('more')
				let a = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
				a.setAttribute('viewBox', '0 0 100 100')
				let u = document.createElementNS('http://www.w3.org/2000/svg', 'use')
				u.setAttribute('href', '#icon-more-horizontal')
				for (let h = 0; h < l.length; h++) {
					let y = l[h],
						{ lum: p } = w(y),
						d = document.createElement('div')
					d.setAttribute('data-color-index', h.toString()),
						d.classList.add('swatch'),
						(d.style.backgroundColor = '#' + y),
						p < 0.5 && d.classList.add('isLight')
					let b = document.createElement('h2')
					;(b.innerHTML = '#' + y), b.classList.add('text'), d.append(b), n.append(d)
				}
				a.append(u), r.append(a), c.append(r), i.append(n, c), R.append(i)
			}
		let s = document.querySelector('.palettes-page .when-empty')
		R.childElementCount == 0 ? s.classList.remove('hidden') : s.classList.add('hidden')
	}
	addItem(e, s) {
		typeof s == 'number' ? this.items.splice(s, 0, e) : this.items.push(e),
			(k.savedPalettes.items = this.items),
			this.draw(this.items)
	}
	removeItem(e) {
		this.items.splice(e, 1), (k.savedPalettes.items = this.items), this.draw(this.items)
	}
}
function W(o) {
	if (o.algorithm.details == 'slot') {
		let e = []
		for (let s = 0; s < 6; s++) e.push(Math.round(f(0, 15)).toString(16))
		return e.join('')
	} else
		for (let e of o.slots)
			if (!e.isLocked) {
				let s = []
				for (let t = 0; t < 6; t++) s.push(Math.round(f(0, 15)).toString(16))
				;(e.hex = s.join('')), e.sync()
			}
}
function F(o, e) {
	if (o.algorithm.details == 'slot')
		if (Math.random() > 0.5) {
			let s = 0,
				t = 0,
				l = 0,
				i = o.slots[e - 2],
				n = o.slots[e - 1],
				c = o.slots[e],
				r = o.slots[e + 1]
			if (c) {
				let { h: a, s: u, l: h } = w(c.hex)
				if (((s = a), n)) {
					let { s: y, l: p } = w(n.hex)
					;(t = u - (u - y) / 2), (l = h - (h - p) / 2)
				} else if (r) {
					let { s: y, l: p } = w(r.hex)
					;(t = u - (y - u) / 2), (l = h - (p - h) / 2)
				} else (t = u * f(0.7, 1.3)), (l = h * f(0.7, 1.3))
			} else if (n) {
				let { h: a, s: u, l: h } = w(n.hex)
				if (((s = a), i)) {
					let { s: y, l: p } = w(i.hex)
					;(t = u + (u - y) / 2), (l = h + (h - p) / 2)
				} else (t = u * f(0.7, 1.3)), (l = h * f(0.7, 1.3))
			} else (t = f(0.2, 1)), (l = f(0.1, 0.9))
			return (t *= f(0.95, 1.05)), (l *= f(0.95, 1.05)), I(s, t, l)
		} else {
			let s, t, l, i, n, c, r
			for (let { hex: a } of o.slots) {
				let { h: u, s: h, l: y } = w(a)
				typeof s != 'number' && (s = u),
					(typeof l != 'number' || h > l) && (l = h),
					(typeof t != 'number' || h < t) && (t = h),
					(typeof n != 'number' || y > n) && (n = y),
					(typeof i != 'number' || y < i) && (i = y)
			}
			return (c = f(t, l) * f(0.95, 1.05)), (r = f(i, n) * f(0.95, 1.05)), I(s, c, r)
		}
	else if (o.algorithm.details == 'increment' || Math.random() > 0.5) {
		let s = [],
			t = f(0, 360),
			l = 0,
			i = 0,
			n = 0,
			c = 0,
			r = 0,
			a = 0,
			u = 0,
			h = 0
		for (let y of o.slots) y.isLocked || s.push(y)
		for (let y = 0; y < s.length; y++)
			if (y == 0) {
				let p = o.slots[0]
				;(l = f(0.1, 1)),
					(i = f(0.1, 0.9)),
					(p.hex = I(t, l, i)),
					p.sync(),
					(n = l),
					(c = i),
					n < 0.4 ? (r = f(0.7, 1)) : n > 0.6 ? (r = f(0.1, 0.3)) : n > 0.5 ? (r = f(0.1, 0.2)) : (r = f(0.8, 0.9)),
					c < 0.4 ? (a = f(0.7, 1)) : c > 0.6 ? (a = f(0.1, 0.3)) : c > 0.5 ? (a = f(0.1, 0.2)) : (a = f(0.8, 0.9)),
					(u = (r - n) / o.slots.length),
					(h = (a - c) / o.slots.length)
			} else {
				let p = o.slots[y]
				;(l = n + u * y), (i = c + h * y), (p.hex = I(t, l, i)), p.sync()
			}
	} else {
		let s = f(0, 360),
			t,
			l,
			i
		for (let n of o.slots)
			n.isLocked ||
				((t = f(0.2, 1)),
				(l = f(0.2, 0.8)),
				typeof i != 'number' && (s = i = f(0, 360)),
				(n.hex = I(s, t, l)),
				n.sync())
	}
}
function X(o, e) {
	if (o.algorithm.details == 'slot')
		if (Math.random() > 0.5) {
			let s = 0,
				t = 0,
				l = 0,
				i = o.slots[e - 2],
				n = o.slots[e - 1],
				c = o.slots[e],
				r = o.slots[e + 1]
			if (c) {
				let { h: a, s: u, l: h } = w(c.hex)
				if (n) {
					let { h: y, s: p, l: d } = w(n.hex),
						b = a - y
					b > 180 ? (b = a - y - 360) : b < -180 && (b = a - y + 360),
						(s = a - b / 2),
						(t = u - (u - p) / 2),
						(l = h - (h - d) / 2)
				} else if (r) {
					let { h: y, s: p, l: d } = w(r.hex),
						b = y - a
					b > 180 ? (b = y - a - 360) : b < -180 && (b = y - a + 360),
						(s = a - b / 2),
						(t = u - (p - u) / 2),
						(l = h - (d - h) / 2)
				} else (s = a * f(0.7, 1.3)), (t = u * f(0.7, 1.3)), (l = h * f(0.7, 1.3))
			} else if (n) {
				let { h: a, s: u, l: h } = w(n.hex)
				if (i) {
					let { h: y, s: p, l: d } = w(i.hex),
						b = a - y
					b > 180 ? (b = a - y - 360) : b < -180 && (b = a - y + 360),
						(s = a + b / 2),
						(t = u + (u - p) / 2),
						(l = h + (h - d) / 2)
				} else (s = a * f(0.7, 1.3)), (t = u * f(0.7, 1.3)), (l = h * f(0.7, 1.3))
			} else (s = f(0, 360)), (t = f(0.2, 1)), (l = f(0.1, 0.9))
			return (s *= f(0.95, 1.05)), (t *= f(0.95, 1.05)), (l *= f(0.95, 1.05)), I(s, t, l)
		} else {
			let s,
				t,
				l,
				i,
				n,
				c,
				r,
				a,
				u,
				h,
				y = Math.random()
			for (let { hex: p } of o.slots) {
				let { h: d, s: b, l: m } = w(p)
				if (typeof s != 'number') s = d
				else if (typeof t != 'number') {
					let x = s,
						v = x - d
					v > 180 ? (x -= 360) : v < -180 && (x += 360), (v = x - d), (v < -25 || v > 25) && (t = d)
				} else if (typeof l != 'number') {
					let x = s,
						v = t,
						L = x - d,
						S = v - d
					L > 180 ? (x -= 360) : L < -180 && (x += 360),
						S > 180 ? (v -= 360) : S < -180 && (v += 360),
						(L = x - d),
						(S = v - d),
						(L > 25 || L < -25) && (S > 25 || S < -25) && (l = d)
				}
				;(typeof n != 'number' || b > n) && (n = b),
					(typeof i != 'number' || b < i) && (i = b),
					(typeof r != 'number' || m > r) && (r = m),
					(typeof c != 'number' || m < c) && (c = m)
			}
			return (
				l && y < 0.333 ? (a = l) : t && y > 0.666 ? (a = t) : (a = s),
				(u = f(i, n) * f(0.95, 1.05)),
				(h = f(c, r) * f(0.95, 1.05)),
				I(a, u, h)
			)
		}
	else if (o.algorithm.details == 'increment' || Math.random() > 0.5) {
		let s = 0,
			t = 0,
			l = 0,
			i = 0,
			n = 0,
			c = 0,
			r = 0,
			a = 0,
			u = 0,
			h = 0,
			y = 0,
			p = 0
		for (let d = 0; d < o.slots.length; d++) {
			let b = o.slots[d]
			if (!b.isLocked)
				if (!i)
					(s = i = f(0, 360)),
						(t = n = f(0.1, 1)),
						(l = c = f(0.1, 0.9)),
						(b.hex = I(s, t, l)),
						b.sync(),
						(i = s),
						(n = t),
						(c = l),
						Math.random() > 0.5 ? (r = s + f(90, 120)) : (r = s - f(75, 90)),
						n < 0.4 ? (a = f(0.7, 1)) : n > 0.6 ? (a = f(0.1, 0.3)) : n > 0.5 ? (a = f(0.1, 0.2)) : (a = f(0.8, 0.9)),
						c < 0.4 ? (u = f(0.7, 1)) : c > 0.6 ? (u = f(0.1, 0.3)) : c > 0.5 ? (u = f(0.1, 0.2)) : (u = f(0.8, 0.9)),
						(h = (r - i) / o.slots.length),
						(y = (a - n) / o.slots.length),
						(p = (u - c) / o.slots.length)
				else {
					let m = o.slots[d]
					;(s = i + h * d), (t = n + y * d), (l = c + p * d), (m.hex = I(s, t, l)), m.sync()
				}
		}
	} else {
		let s, t, l, i, n, c
		for (let r of o.slots)
			if (!r.isLocked) {
				if (((t = f(0.2, 1)), (l = f(0.2, 0.8)), typeof i != 'number')) s = i = f(0, 360)
				else if (typeof n != 'number') s = n = i + 30 * f(0.975, 1.025)
				else if (typeof c != 'number') s = c = i - 30 * f(0.975, 1.025)
				else {
					let a = Math.random()
					a < 0.333 ? (s = i) : a > 0.666 ? (s = n) : (s = c)
				}
				;(r.hex = I(s, t, l)), r.sync()
			}
	}
}
function G(o) {
	if (o.algorithm.details == 'slot') {
		let e,
			s,
			t,
			l,
			i,
			n,
			c,
			r,
			a,
			u = Math.random()
		for (let { hex: h } of o.slots) {
			let { h: y, s: p, l: d } = w(h)
			if (typeof e != 'number') e = y
			else if (typeof s != 'number') {
				let b = e,
					m = b - y
				m > 180 ? (b -= 360) : m < -180 && (b += 360), (m = b - y), (m < -90 || m > 90) && (s = y)
			}
			;(typeof l != 'number' || p > l) && (l = p),
				(typeof t != 'number' || p < t) && (t = p),
				(typeof n != 'number' || d > n) && (n = d),
				(typeof i != 'number' || d < i) && (i = d)
		}
		return (
			u > 0.5 && s ? (c = s * f(0.925, 1.025)) : (c = e * f(0.925, 1.025)),
			(r = f(t, l) * f(0.95, 1.05)),
			(a = f(i, n) * f(0.95, 1.05)),
			I(c, r, a)
		)
	} else {
		let e, s, t, l, i
		for (let n of o.slots)
			n.isLocked ||
				((s = f(0.2, 1)),
				(t = f(0.2, 0.8)),
				typeof l != 'number'
					? (e = l = f(0, 360))
					: typeof i != 'number'
					? (e = i = l + 150 * f(0.975, 1.025))
					: Math.random() < 0.5
					? (e = l * f(0.975, 1.025))
					: (e = i * f(0.975, 1.025)),
				(n.hex = I(e, s, t)),
				n.sync())
	}
}
function Z(o) {
	if (o.algorithm.details == 'slot') {
		let e,
			s,
			t,
			l,
			i,
			n,
			c,
			r,
			a,
			u,
			h = Math.random()
		for (let { hex: y } of o.slots) {
			let { h: p, s: d, l: b } = w(y)
			if (typeof e != 'number') e = p
			else if (typeof s != 'number') {
				let m = e,
					x = m - p
				x > 180 ? (m -= 360) : x < -180 && (m += 360), (x = m - p), (x < -30 || x > 30) && (s = p)
			} else if (typeof t != 'number') {
				let m = e,
					x = s,
					v = m - p,
					L = x - p
				v > 180 ? (m -= 360) : v < -180 && (m += 360),
					L > 180 ? (x -= 360) : L < -180 && (x += 360),
					(v = m - p),
					(L = x - p),
					(v > 30 || v < -30) && (L > 30 || L < -30) && (t = p)
			}
			;(typeof i != 'number' || d > i) && (i = d),
				(typeof l != 'number' || d < l) && (l = d),
				(typeof c != 'number' || b > c) && (c = b),
				(typeof n != 'number' || b < n) && (n = b)
		}
		return (
			h < 0.333 && t ? (r = t) : h > 0.666 && s ? (r = s) : (r = e),
			(a = f(l, i) * f(0.95, 1.05)),
			(u = f(n, c) * f(0.95, 1.05)),
			I(r, a, u)
		)
	} else {
		let e, s, t, l, i, n
		for (let c of o.slots)
			if (!c.isLocked) {
				if (((s = f(0.2, 1)), (t = f(0.2, 0.8)), typeof l != 'number')) e = l = f(0, 360)
				else if (typeof i != 'number') e = i = l + 150 * f(0.975, 1.025)
				else if (typeof n != 'number') e = n = l - 150 * f(0.975, 1.025)
				else {
					let r = Math.random()
					r < 0.333 ? (e = l * f(0.975, 1.025)) : r > 0.666 ? (e = i * f(0.975, 1.025)) : (e = n * f(0.975, 1.025))
				}
				;(c.hex = I(e, s, t)), c.sync()
			}
	}
}
function Q(o) {
	if (o.algorithm.details == 'slot') {
		let e,
			s,
			t,
			l,
			i,
			n,
			c,
			r,
			a,
			u,
			h = Math.random()
		for (let { hex: y } of o.slots) {
			let { h: p, s: d, l: b } = w(y)
			if (typeof e != 'number') e = p
			else if (typeof s != 'number') {
				let m = e,
					x = m - p
				x > 180 ? (m -= 360) : x < -180 && (m += 360), (x = m - p), (x < -90 || x > 90) && (s = p)
			} else if (typeof t != 'number') {
				let m = e,
					x = s,
					v = m - p,
					L = x - p
				v > 180 ? (m -= 360) : v < -180 && (m += 360),
					L > 180 ? (x -= 360) : L < -180 && (x += 360),
					(v = m - p),
					(L = x - p),
					(v > 90 || v < -90) && (L > 90 || L < -90) && (t = p)
			}
			;(typeof i != 'number' || d > i) && (i = d),
				(typeof l != 'number' || d < l) && (l = d),
				(typeof c != 'number' || b > c) && (c = b),
				(typeof n != 'number' || b < n) && (n = b)
		}
		return (
			h < 0.333 ? (r = e) : h > 0.666 ? (r = s) : (r = t),
			(a = f(l, i) * f(0.95, 1.05)),
			(u = f(n, c) * f(0.95, 1.05)),
			I(r, a, u)
		)
	} else {
		let e, s, t, l, i, n
		for (let c of o.slots)
			if (!c.isLocked) {
				if (((s = f(0.2, 1)), (t = f(0.2, 0.8)), typeof l != 'number')) e = l = f(0, 360)
				else if (typeof i != 'number') e = i = l + 120
				else if (typeof n != 'number') e = n = l - 120
				else {
					let r = Math.random()
					r < 0.333 ? (e = l) : r < 0.666 ? (e = i) : (e = n)
				}
				;(c.hex = I(e, s, t)), c.sync()
			}
	}
}
function _(o) {
	if (o.algorithm.details == 'slot') {
		let e,
			s,
			t,
			l,
			i,
			n,
			c,
			r,
			a,
			u,
			h,
			y = Math.random()
		for (let { hex: p } of o.slots) {
			let { h: d, s: b, l: m } = w(p)
			if (typeof e != 'number') e = d
			else if (typeof s != 'number') {
				let x = e,
					v = x - d
				v > 180 ? (x -= 360) : v < -180 && (x += 360), (v = x - d), (v < -45 || v > 45) && (s = d)
			} else if (typeof t != 'number') {
				let x = e,
					v = s,
					L = x - d,
					S = v - d
				L > 180 ? (x -= 360) : L < -180 && (x += 360),
					S > 180 ? (v -= 360) : S < -180 && (v += 360),
					(L = x - d),
					(S = v - d),
					(L > 45 || L < -45) && (S > 45 || S < -45) && (t = d)
			} else if (typeof l != 'number') {
				let x = e,
					v = s,
					L = t,
					S = x - d,
					T = v - d,
					M = L - d
				S > 180 ? (x -= 360) : S < -180 && (x += 360),
					T > 180 ? (v -= 360) : T < -180 && (v += 360),
					M > 180 ? (L -= 360) : M < -180 && (L += 360),
					(S = x - d),
					(T = v - d),
					(M = L - d),
					(S > 45 || S < -45) && (T > 45 || T < -45) && (M > 45 || M < -45) && (l = d)
			}
			;(typeof n != 'number' || b > n) && (n = b),
				(typeof i != 'number' || b < i) && (i = b),
				(typeof r != 'number' || m > r) && (r = m),
				(typeof c != 'number' || m < c) && (c = m)
		}
		return (
			typeof l == 'number' && y < 0.25
				? (a = l)
				: typeof t == 'number' && y < 0.5
				? (a = t)
				: typeof s == 'number' && y < 0.75
				? (a = s)
				: (a = e),
			(u = f(i, n) * f(0.95, 1.05)),
			(h = f(c, r) * f(0.95, 1.05)),
			I(a, u, h)
		)
	} else {
		let e, s, t, l, i, n, c
		for (let r of o.slots)
			if (!r.isLocked) {
				if (((s = f(0.2, 1)), (t = f(0.2, 0.8)), typeof l != 'number')) e = l = f(0, 360)
				else if (typeof i != 'number') e = i = l + 60
				else if (typeof n != 'number') e = n = l - 120
				else if (typeof c != 'number') e = c = l + 180
				else {
					let a = Math.random()
					a < 0.25 ? (e = l) : a > 0.5 ? (e = i) : a > 0.75 ? (e = n) : (e = c)
				}
				;(r.hex = I(e, s, t)), r.sync()
			}
	}
}
function ee(o) {
	if (o.algorithm.details == 'slot') {
		let e,
			s,
			t,
			l,
			i,
			n,
			c,
			r,
			a,
			u,
			h,
			y = Math.random()
		for (let { hex: p } of o.slots) {
			let { h: d, s: b, l: m } = w(p)
			if (typeof e != 'number') e = d
			else if (typeof s != 'number') {
				let x = e,
					v = x - d
				v > 180 ? (x -= 360) : v < -180 && (x += 360), (v = x - d), (v < -85 || v > 85) && (s = d)
			} else if (typeof t != 'number') {
				let x = e,
					v = s,
					L = x - d,
					S = v - d
				L > 180 ? (x -= 360) : L < -180 && (x += 360),
					S > 180 ? (v -= 360) : S < -180 && (v += 360),
					(L = x - d),
					(S = v - d),
					(L < -85 || L > 85) && (S < -85 || S > 85) && (t = d)
			} else if (typeof l != 'number') {
				let x = e,
					v = s,
					L = t,
					S = x - d,
					T = v - d,
					M = L - d
				S > 180 ? (x -= 360) : S < -180 && (x += 360),
					T > 180 ? (v -= 360) : T < -180 && (v += 360),
					M > 180 ? (L -= 360) : M < -180 && (L += 360),
					(S = x - d),
					(T = v - d),
					(M = L - d),
					(S < -85 || (S > 85 && T < -85) || (T > 85 && (M < -85 || M > 85))) && (l = d)
			}
			;(typeof n != 'number' || b > n) && (n = b),
				(typeof i != 'number' || b < i) && (i = b),
				(typeof r != 'number' || m > r) && (r = m),
				(typeof c != 'number' || m < c) && (c = m)
		}
		return (
			typeof l == 'number' && y < 0.25
				? (a = l)
				: typeof t == 'number' && y < 0.5
				? (a = t)
				: typeof s == 'number' && y < 0.75
				? (a = s)
				: (a = e),
			(u = f(i, n) * f(0.95, 1.05)),
			(h = f(c, r) * f(0.95, 1.05)),
			I(a, u, h)
		)
	} else {
		let e, s, t, l, i, n, c
		for (let r of o.slots)
			if (!r.isLocked) {
				if (((s = f(0.2, 1)), (t = f(0.2, 0.8)), typeof l != 'number')) e = l = f(0, 360)
				else if (typeof i != 'number') e = i = l + 60
				else if (typeof n != 'number') e = n = l - 120
				else if (typeof c != 'number') e = c = l + 180
				else {
					let a = Math.random()
					a < 0.25 ? (e = l) : a > 0.5 ? (e = i) : a > 0.75 ? (e = n) : (e = c)
				}
				;(r.hex = I(e, s, t)), r.sync()
			}
	}
}
function ue(o, e) {
	switch (Math.round(f(0, 7))) {
		case 0:
			return W(o)
		case 1:
			return F(o, e)
		case 2:
		default:
			return X(o, e)
		case 3:
			return G(o)
		case 4:
			return Z(o)
		case 5:
			return Q(o)
		case 6:
			return _(o)
		case 7:
			return ee(o)
	}
}
const fe = [W, F, X, G, Z, Q, _, ee, ue]
let pe = document.getElementById('palette')
class he {
	constructor() {
		j(this, 'slots', [])
		j(this, 'plus', {
			palette: this,
			disabled: !1,
			active: !1,
			show(e) {
				if (!this.active) {
					let s = this.render(e.toString()),
						t = this.palette.slots[e]
					t
						? document.getElementById(t.id).after(s)
						: ((t = this.palette.slots[e + 1]), document.getElementById(t.id).before(s)),
						(this.active = !0)
				}
			},
			hide() {
				var e
				this.active &&
					((e = document.getElementById('plus-button')) == null || e.parentElement.parentElement.remove(),
					(this.active = !1))
			},
			render(e) {
				let s = document.createElement('div')
				s.classList.add('plus-container')
				let t = document.createElement('div')
				t.classList.add('circle')
				let l = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
				l.setAttribute('data-color-index', e), l.setAttribute('viewBox', '0 0 100 100'), (l.id = 'plus-button')
				let i = document.createElementNS('http://www.w3.org/2000/svg', 'use')
				return (
					i.setAttribute('href', '#icon-plus-button'),
					i.setAttribute('viewBox', '0 0 100 100'),
					l.append(i),
					t.append(l),
					s.append(t),
					s
				)
			},
		})
		j(this, 'algorithm', {
			list: fe,
			get(e) {
				e == 'slot' ? (this.details = 'slot') : (this.details = '')
				let s = k.settings.lastColorAlgorithmIndex
				return s || (k.settings = { lastColorAlgorithmIndex: 1 }), this.list[s]
			},
			details: '',
			direction: { h: 0, s: 0, l: 0 },
			preference: { h: void 0, s: void 0, l: void 0 },
		})
	}
	removeSlot(e, s) {
		s || (s = { animations: !0 })
		let t = e.data + 1
		for (let i = t; i < this.slots.length; i++) this.slots[i].data--
		let l = document.getElementById(e.id)
		if ((this.slots.splice(e.data, 1), s.animations == !0)) {
			let i = function () {
				l.remove(), l.removeEventListener('animationend', i), l.removeEventListener('animationcancel', i)
			}
			l.classList.add('deinit'), l.addEventListener('animationend', i), l.addEventListener('animationcancel', i)
		} else l.remove()
		return e
	}
	addSlot(e, s) {
		var n
		let t = {
			palette: this,
			hex: e.hex,
			isLocked: typeof e.isLocked == 'boolean' ? e.isLocked : !1,
			id: e.id || de(),
			index: typeof e.index != 'number' ? this.slots.length : e.index,
			get data() {
				var r
				let c = parseInt((r = document.getElementById(this.id)) == null ? void 0 : r.getAttribute('data-color-index'))
				return typeof c == 'number' ? c : (this.data = this.index)
			},
			set data(c) {
				var r
				;(r = document.getElementById(this.id)) == null || r.setAttribute('data-color-index', c.toString()),
					(this.index = c)
			},
			generate() {
				;(this.hex = this.palette.algorithm.get('slot')(this.palette, this.index)), this.sync()
			},
			sync() {
				let c = document.getElementById(this.id)
				if (this.hex) {
					let { lum: r } = w(this.hex)
					r < 0.5 ? c.classList.add('isLight') : c.classList.remove('isLight'),
						(c.style.backgroundColor = '#' + this.hex),
						(c.getElementsByClassName('hex')[0].innerHTML = '#' + this.hex)
				}
			},
		}
		t.hex || (t.hex = this.algorithm.get('slot')(this, t.index))
		let l = this.createSwatch(t, s),
			i = document.getElementById((n = this.slots[t.index - 1]) == null ? void 0 : n.id)
		i ? i.after(l) : pe.prepend(l), (t.data = t.index), this.slots.splice(t.index, 0, t)
		for (let c = t.index + 1; c < this.slots.length; c++) this.slots[c].data++
		return t
	}
	createSwatch(e, s) {
		s || (s = { animations: !0 })
		let t = document.createElement('div')
		if ((t.classList.add('swatch'), t.setAttribute('data-color-index', e.data), (t.id = e.id), e.hex)) {
			t.style.backgroundColor = '#' + e.hex
			let { lum: m } = w(e.hex)
			m < 0.5 ? t.classList.add('isLight') : t.classList.remove('isLight')
		}
		if (s.animations == !0) {
			let m = function () {
				t.classList.remove('init'),
					t.removeEventListener('animationend', m),
					t.removeEventListener('animationcancel', m)
			}
			t.classList.add('init'), t.addEventListener('animationend', m), t.addEventListener('animationcancel', m)
		}
		let l = document.createElement('div')
		l.classList.add('options')
		let i = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		i.classList.add('icon', 'x'), i.setAttribute('viewBox', '0 0 100 100')
		let n = document.createElementNS('http://www.w3.org/2000/svg', 'use')
		n.setAttribute('href', '#icon-x')
		let c = document.createElementNS('http://www.w3.org/2000/svg', 'use')
		c.setAttribute('viewBox', '0 0 100 100'), c.setAttribute('href', '#icon-lock-body')
		let r = document.createElementNS('http://www.w3.org/2000/svg', 'use')
		r.setAttribute('viewBox', '0 0 100 100'), r.setAttribute('href', '#icon-lock-arm')
		let a = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		a.setAttribute('viewBox', '0 0 100 100'), a.classList.add('icon', 'lock'), e.isLocked && a.classList.add('locked')
		let u = document.createElement('div')
		u.classList.add('info')
		let h = document.createElement('h2')
		h.classList.add('hex'), (h.innerHTML = '#' + e.hex)
		let y = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		y.classList.add('icon'), y.setAttribute('viewBox', '0 0 100 100')
		let p = document.createElementNS('http://www.w3.org/2000/svg', 'use')
		p.setAttribute('href', '#icon-copy')
		let d = document.createElement('div')
		d.classList.add('detector', 'left')
		let b = document.createElement('div')
		return (
			b.classList.add('detector'),
			i.append(n),
			a.append(r, c),
			y.append(p),
			u.append(h, y),
			l.append(i, a, u),
			t.append(l, d, b),
			t
		)
	}
	generate(e) {
		let s = { animations: !1 }
		if (e)
			if (e.length == this.slots.length)
				for (let t = 0; t < e.length; t++) (this.slots[t].hex = e[t]), this.slots[t].sync()
			else {
				for (let t of this.slots) document.getElementById(t.id).remove()
				this.slots = []
				for (let t = 0; t < e.length; t++) this.addSlot({ index: t, hex: e[t] }, s)
			}
		else if (this.slots.length > 0) this.algorithm.get()(this)
		else {
			for (let t = 0; t < 5; t++) this.addSlot({}, s)
			this.algorithm.get()(this)
		}
		return this.slots
	}
}
class ye {
	constructor(e) {
		j(this, 'routes')
		j(this, 'loadContent', (e) => {
			if (e) {
				let { base: s, ids: t } = e
				!s && s != '' && (s = e)
				let l = this.routes.get(s)
				t ? l(t) : l()
			} else this.routes.get('404')()
		})
		j(this, 'routeToURL', (e) => {
			let s = this.deconstructURL(e),
				{ base: t, ids: l } = s
			this.routes.has(t)
				? t === 'create'
					? l
						? this.idsAreValid(l)
							? this.loadContent(s)
							: this.loadContent()
						: this.loadContent(s)
					: this.loadContent(s)
				: this.loadContent()
		})
		j(this, 'navigateTo', (e, s) => {
			;(s = s || !1),
				s ? history.replaceState('', '', 'PolyChrome' + e) : history.pushState('', '', 'PolyChrome' + e),
				this.routeToURL(e)
		})
		this.routes = new Map(e)
	}
	deconstructURL(e) {
		let s = e
			.replace(/^\/PolyChrome\//, '')
			.replace(/\/$/, '')
			.split('/')
		return { base: s[0], ids: s[1] ? s[1].split('-') : null }
	}
	idsAreValid(e) {
		for (let s of e) if (!/^[a-f0-9]{6}$/.test(s) || e.length > 8) return !1
		return !0
	}
}
function ge() {
	;(document.querySelector('#palette').onclick = async (s) => {
		let t = s.target,
			l = t.closest('.plus-container svg')
		if (l) {
			const { ids: n } = N.deconstructURL(location.pathname),
				c = parseInt(l.getAttribute('data-color-index'))
			let r = g.addSlot({ index: c + 1 })
			n.splice(c + 1, 0, r.hex),
				history.replaceState('', '', n.join('-')),
				g.plus.hide(),
				H.create.push({
					undo() {
						g.removeSlot(r, { animations: !1 }), n.splice(c + 1, 1), history.replaceState('', '', n.join('-'))
					},
					redo() {
						g.addSlot(r, { animations: !1 }), n.splice(c + 1, 0, r.hex), history.replaceState('', '', n.join('-'))
					},
				}),
				g.slots.length == 8 && g.plus.hide()
			return
		}
		let i = t.closest('.lock')
		if (i) {
			let n = t.closest('.swatch'),
				c = parseInt(n.getAttribute('data-color-index')),
				r = g.slots[c]
			;(r.isLocked = !r.isLocked),
				i.classList.toggle('locked'),
				H.create.push({
					undo() {
						let a = g.slots[c],
							u = document.getElementById(a.id)
						;(a.isLocked = !a.isLocked), u.querySelector('.lock').classList.toggle('locked')
					},
					redo() {
						let a = g.slots[c],
							u = document.getElementById(a.id)
						;(a.isLocked = !a.isLocked), u.querySelector('.lock').classList.toggle('locked')
					},
				})
			return
		}
		if (t.closest('.x')) {
			let n = t.closest('.swatch'),
				c = g.slots[parseInt(n.getAttribute('data-color-index'))],
				{ ids: r } = N.deconstructURL(location.pathname)
			g.removeSlot(c),
				r.splice(c.data, 1),
				history.replaceState('', '', r.join('-')),
				H.create.push({
					undo() {
						g.addSlot(c, { animations: !1 }), r.splice(c.data, 0, c.hex), history.replaceState('', '', r.join('-'))
					},
					redo() {
						g.removeSlot(c, { animations: !1 }), r.splice(c.data, 1), history.replaceState('', '', r.join('-'))
					},
				})
			return
		}
		if (t.closest('.info')) {
			let n = t.closest('.swatch'),
				c = g.slots[parseInt(n.getAttribute('data-color-index'))]
			if (t.closest('.hex')) {
				let r = z([{ id: '' }], { type: 'color-picker', hex: c.hex })
				n.append(r)
				return
			}
			if (t.closest('.icon')) {
				await navigator.clipboard.writeText(c.hex).then(
					() => {
						let r = E('Copied hex to clipboard!', { pos: [s.x, s.y] })
						r.classList.add('at-mouse-pos'), document.body.append(r)
					},
					() => {
						let r = E('Copy to clipboard failed.', { pos: [s.x, s.y] })
						r.classList.add('at-mouse-pos'), document.body.append(r)
					}
				)
				return
			}
		}
	}),
		(document.querySelector('.palettes-page .saved-palettes-wrapper').onclick = async (s) => {
			let t = s.target,
				l = t.closest('.swatch')
			if (l) {
				let n = l.parentElement.parentElement
				await navigator.clipboard
					.writeText(
						A.items[parseInt(n.getAttribute('data-palette-index'))][parseInt(l.getAttribute('data-color-index'))]
					)
					.then(
						() => {
							let c = E('Copied hex to clipboard!', { pos: [s.x, s.y] })
							c.classList.add('at-mouse-pos'), document.body.append(c)
						},
						() => {
							let c = E('Copy to clipboard failed.', { pos: [s.x, s.y] })
							c.classList.add('at-mouse-pos'), document.body.append(c)
						}
					)
				return
			}
			if (t.closest('.overlay')) {
				t.closest('.popover').remove()
				return
			}
			if (t.closest('#palettes-open')) {
				N.navigateTo(
					'/create/' +
						k.savedPalettes.items[parseInt(t.closest('.palette-container').getAttribute('data-palette-index'))].join(
							'-'
						)
				)
				return
			}
			if (t.closest('#palettes-copy')) {
				await navigator.clipboard
					.writeText(
						A.items[parseInt(t.closest('.palette-container').getAttribute('data-palette-index'))].join(`
`)
					)
					.then(
						() => {
							let n = E('Copied hex to clipboard!', { pos: [s.x, s.y] })
							n.classList.add('at-mouse-pos'), document.body.append(n)
						},
						() => {
							let n = E('Copy to clipboard failed.', { pos: [s.x, s.y] })
							n.classList.add('at-mouse-pos'), document.body.append(n)
						}
					)
				return
			}
			if (t.closest('#palettes-remove')) {
				let n = parseInt(t.closest('.palette-container').getAttribute('data-palette-index')),
					c = A.items[n],
					r = {
						undo() {
							A.addItem(c, n)
						},
						redo() {
							A.removeItem(n)
						},
					}
				H.palettes.push(r), A.removeItem(n)
				let a = E('Removed palette.')
				document.body.append(a)
				return
			}
			let i = t.closest('.more')
			if (i) {
				let n = z(
					[
						{ content: 'Open', id: 'palettes-open' },
						{ content: 'Remove', id: 'palettes-remove' },
						{ content: 'Copy', id: 'palettes-copy' },
					],
					{ type: 'menu' }
				)
				i.parentElement.append(n)
				return
			}
		}),
		(document.querySelector('.toolbar').onclick = async (s) => {
			let t = s.target
			if (t.closest('.undo')) {
				N.deconstructURL(location.pathname).base == 'create' ? H.create.undo() : H.palettes.undo()
				return
			}
			if (t.closest('.redo')) {
				N.deconstructURL(location.pathname).base == 'create' ? H.create.redo() : H.palettes.redo()
				return
			}
			if (t.closest('.copy')) {
				if (N.deconstructURL(location.pathname).base == 'create') {
					let l = []
					for (let { hex: i } of g.slots) l.push(i)
					await navigator.clipboard
						.writeText(
							l.join(`
`)
						)
						.then(
							() => {
								let i = E('Copied palette!')
								document.body.append(i)
							},
							() => {
								let i = E('Failed to copy.')
								document.body.append(i)
							}
						)
				} else {
					let l = []
					for (let i of A.items) l.push(i.join('-'))
					await navigator.clipboard
						.writeText(
							l.join(`,
`)
						)
						.then(
							() => {
								let i = E('Copied palettes to clipboard!')
								document.body.append(i)
							},
							() => {
								let i = E('Copy to clipboard failed.')
								document.body.append(i)
							}
						)
				}
				return
			}
			if (t.closest('.generate')) {
				let l = []
				for (let { hex: n } of g.slots) l.push(n)
				g.generate()
				let i = []
				for (let { hex: n } of g.slots) i.push(n)
				history.replaceState('', '', '/create/' + i.join('-')),
					l &&
						H.create.push({
							undo: () => {
								g.generate(l), history.replaceState('', '', '/create/' + l.join('-'))
							},
							redo: () => {
								g.generate(i), history.replaceState('', '', '/create/' + i.join('-'))
							},
						})
				return
			}
			if (t.closest('.save')) {
				if (!k.settings.cookiesOk) {
					document.body.append(E("You'll need to enable cookies in settings for that feature."))
					return
				}
				let l = []
				for (let { hex: n } of g.slots) l.push(n)
				A.addItem(l)
				let i = E('Saved palette!')
				document.body.append(i)
				return
			}
			if (t.closest('.remove-all')) {
				K(
					{
						message: "Are you sure you want to delete all of your palettes? You won't be able to undo this.",
						value: 'remove-all',
					},
					[
						{
							message: 'Yes, delete away.',
							value: 'yes',
							call() {
								for (let i = 0; A.items.length; i++) A.removeItem(0)
								let l = E('All palettes removed.')
								document.body.append(l)
							},
						},
						{ message: "No, please don't delete my stuff!", value: 'no' },
					]
				)
				return
			}
			if (t.closest('.import')) {
				if (N.deconstructURL(location.pathname).base == 'create') {
					let l = J('Paste hex code palette below!', 'import-create')
					document.body.append(l)
				} else {
					if (!k.settings.cookiesOk) {
						document.body.append(E("You'll need to enable cookies in settings for that feature."))
						return
					}
					let l = J('Paste hex code palette below! Separate palettes by commas.', 'import-palettes')
					document.body.append(l)
				}
				return
			}
		})
	let o = document.querySelector('.main-nav'),
		e = document.querySelector('.main-header')
	onclick = async (s) => {
		var n, c
		let t = s.target,
			l = t.closest('a')
		if (l) {
			s.preventDefault()
			let r = l.getAttribute('href')
			o.classList.remove('visible'),
				(n = document.querySelector('.overlay')) == null || n.remove(),
				(document.body.style.overflowY = ''),
				r != location.pathname && N.navigateTo(r)
			return
		}
		if (t.closest('#nav-button'))
			if ((o.classList.toggle('visible'), o.classList.contains('visible'))) {
				let r = document.createElement('div')
				r.classList.add('overlay'),
					e.append(r),
					(document.body.style.overflowY = 'hidden'),
					g.plus.hide(),
					r.addEventListener(
						'click',
						() => {
							r.remove(), o.classList.remove('visible'), (document.body.style.overflowY = '')
						},
						{ once: !0 }
					),
					(document.body.style.overflowY = 'hidden')
			} else (c = e.querySelector('.overlay')) == null || c.remove(), (document.body.style.overflowY = '')
		if (t.closest('#settings')) {
			let r = ce()
			document.body.append(r)
			return
		}
		let i = t.closest('.confirmation-screen')
		if (i) {
			if (
				(t.closest('.overlay') &&
					(i == document.querySelector('.cookies') && ((k.settings = { cookiesOk: !0 }), (k.info = { firstVisit: !0 })),
					i.remove()),
				i == document.querySelector('.remove-all-confirmation'))
			) {
				if (t.closest('.yes')) {
					for (let a = 0; A.items.length; a++) A.removeItem(0)
					i.remove()
					let r = E('All palettes removed.')
					document.body.append(r)
				} else t.closest('.no') && i.remove()
				return
			}
			if (i == document.querySelector('.import-create')) {
				let r = N.deconstructURL(location.pathname).ids,
					a = t.closest('.yes'),
					u = t.closest('.no')
				if (a) {
					let h = i
							.querySelector('textarea')
							.value.trim()
							.replaceAll(' ', '')
							.replaceAll(
								`
`,
								''
							)
							.replaceAll('-', ''),
						y = /[g-z~`!#$%\^&*+=\[\]\\';,/{}|\\":<>\?]/g.test(h) ? !1 : h.length != 0
					y && (y = h.length % 6 == 0)
					let p = 'Invalid values entered. Try again.'
					if (y) {
						p = 'Successfully imported values.'
						let b = h.match(/.{1,6}/g)
						g.generate(b),
							H.create.push({
								undo() {
									g.generate(r)
								},
								redo() {
									g.generate(b)
								},
							})
					}
					let d = E(p)
					document.body.append(d), i.remove()
				} else u && i.remove()
				return
			}
			if (i == document.querySelector('.import-palettes')) {
				let r = t.closest('.yes'),
					a = t.closest('.no')
				if (r) {
					let u = i
							.querySelector('textarea')
							.value.trim()
							.replaceAll(' ', '')
							.replaceAll(
								`
`,
								''
							)
							.replaceAll('-', '')
							.replaceAll('#', '')
							.toLowerCase(),
						h = 'Invalid values entered. Try again.',
						y =
							/[g-z~`!#$%\^&*+=\[\]\\';/{}|\\":<>\?]/g.test(u) || u.replaceAll(',', '').length % 6 != 0
								? !1
								: u.length != 0
					console.log(u.replaceAll(',', '').length % 6 != 0)
					let p = u.split(',')
					for (let b of p) (b.length / 6 > 8 || !(b.length >= 6)) && (y = !1)
					if (y) {
						let b = 0
						for (let m of p) b++, A.addItem(m.match(/.{1,6}/g))
						;(h = 'Successfully imported values.'),
							H.palettes.push({
								undo() {
									for (let m = b; m > 0; m--) A.removeItem(A.items.length - 1)
								},
								redo() {
									for (let m of p) A.addItem(m.match(/.{1,6}/g))
								},
							})
					}
					let d = E(h)
					document.body.append(d), i.remove()
				} else a && i.remove()
				return
			}
			if (i == document.querySelector('.settings-popover')) {
				let r = t.closest('.yes'),
					a = t.closest('.no')
				if (r) {
					let u = k.settings
					;(u.lastColorAlgorithmIndex = i.querySelector('#algorithm').selectedIndex),
						(u.cookiesOk = i.querySelector('#cookies-ok').checked),
						(k.settings = u)
					let h = 'Changes saved.'
					i.remove()
					let y = E(h)
					document.body.append(y)
				} else if (a) {
					let u = 'Changes discarded.'
					i.remove()
					let h = E(u)
					document.body.append(h)
				}
				return
			}
			if (i == document.querySelector('.cookies-confirmation')) {
				let r = t.closest('.yes'),
					a = t.closest('.no')
				if (r) {
					;(k.settings = { cookiesOk: !0 }), i.remove()
					let u = E('Thanks, enjoy the site! :)')
					document.body.append(u)
				} else if (a) {
					;(k.settings = { cookiesOk: !1 }), i.remove()
					let u = E("You won't be able to save your palettes. You can change this in settings.", { duration: 2500 })
					document.body.append(u)
				}
				return
			}
		}
	}
}
window.ontouchstart = (o) => {
	let e = o.target.closest('.create-page .swatch')
	if (e && !o.target.closest('.options div') && !o.target.closest('.options svg')) {
		let s = function (y) {
				if (t) {
					let p = y.touches[0].clientY - c
					e.style.translate = '0 ' + p + 'px'
					let d = e,
						b = g.slots.length - r - 1
					if (((h = 0), (u = 0), p > 0))
						for (let m = 0; m < b; m++)
							(h = (m * 2 + 1) * i),
								(d = d.nextElementSibling),
								p > h
									? (u++, d.style.translate != '0 -100%' && (d.style.translate = '0 -100%'))
									: d.style.translate == '0 -100%' && (d.style.translate = '0 0')
					else
						for (let m = 0; m < r; m++)
							(h = (m * 2 + 1) * i),
								(d = d.previousElementSibling),
								-p > h
									? (u--, d.style.translate != '0 100%' && (d.style.translate = '0 100%'))
									: d.style.translate == '0 100%' && (d.style.translate = '0 0')
				} else {
					let p = y.touches[0].clientX - n
					e.style.translate = p + 'px'
					let d = e,
						b = g.slots.length - r - 1
					if (((h = 0), (u = 0), p > 0))
						for (let m = 0; m < b; m++)
							(h = (m * 2 + 1) * l),
								(d = d.nextElementSibling),
								p > h
									? (u++, d.style.translate != '-100%' && (d.style.translate = '-100%'))
									: d.style.translate == '-100%' && (d.style.translate = '')
					else
						for (let m = 0; m < r; m++)
							(h = (m * 2 + 1) * l),
								(d = d.previousElementSibling),
								-p > h
									? (u--, d.style.translate != '100%' && (d.style.translate = '100%'))
									: d.style.translate == '100%' && (d.style.translate = '')
				}
			},
			t = !1
		document.body.classList.contains('vertical') && (t = !0),
			(g.plus.disabled = !0),
			g.plus.hide(),
			e.classList.add('is-dragging')
		let l = e.clientWidth / 2,
			i = e.clientHeight / 2,
			n = o.touches[0].clientX,
			c = o.touches[0].clientY,
			r = parseInt(e.getAttribute('data-color-index')),
			a = g.slots[r],
			u = 0,
			h
		addEventListener('touchmove', s),
			addEventListener(
				'touchend',
				() => {
					e.classList.remove('is-dragging'),
						e.classList.add('is-released'),
						removeEventListener('touchmove', s),
						(e.style.translate = `${t ? '0 ' : ''}${u * 100}%`)
					function y() {
						e.removeEventListener('transitionend', y),
							e.removeEventListener('transitioncancel', y),
							e.classList.remove('is-released')
						let p = e
						for (let m = 0; m < u; m++)
							g.slots.splice(a.data, 1),
								g.slots.splice(a.data + 1, 0, a),
								a.data++,
								(p = p.nextElementSibling),
								g.slots[a.data - 1].data--
						for (let m = 0; m > u; m--)
							g.slots.splice(a.data, 1),
								g.slots.splice(a.data - 1, 0, a),
								a.data--,
								(p = p.previousElementSibling),
								g.slots[a.data + 1].data++
						let d = e.cloneNode(!0)
						u > 0 ? (p.after(d), e.remove()) : u < 0 && (p.before(d), e.remove()), (e.style.translate = '')
						let b = []
						for (let m of g.slots) {
							let x = document.getElementById(m.id)
							;(x.style.transition = 'transform 0s'),
								(x.style.translate = ''),
								setTimeout(() => {
									x.style.transition = ''
								}, 1),
								b.push(m.hex)
						}
						;(e = d),
							history.replaceState('', '', b.join('-')),
							(g.plus.disabled = !1),
							u &&
								H.create.push({
									undo() {
										g.plus.hide()
										let m = (e = document.getElementById(a.id))
										for (let v = 0; v < -u; v++) {
											g.slots.splice(a.data, 1), g.slots.splice(a.data + 1, 0, a), a.data++, (m = m.nextElementSibling)
											let L = parseInt(m.getAttribute('data-color-index'))
											m.setAttribute('data-color-index', (L - 1).toString())
										}
										for (let v = 0; v > -u; v--) {
											g.slots.splice(a.data, 1),
												g.slots.splice(a.data - 1, 0, a),
												a.data--,
												(m = m.previousElementSibling)
											let L = parseInt(m.getAttribute('data-color-index'))
											m.setAttribute('data-color-index', (L + 1).toString())
										}
										;(d = e.cloneNode(!0)), -u > 0 ? (m.after(d), e.remove()) : -u < 0 && (m.before(d), e.remove())
										let x = []
										for (let v of g.slots) x.push(v.hex)
										history.replaceState('', '', x.join('-'))
									},
									redo() {
										g.plus.hide()
										let m = (e = document.getElementById(a.id))
										for (let v = 0; v < u; v++)
											g.slots.splice(a.data, 1),
												g.slots.splice(a.data + 1, 0, a),
												a.data++,
												(m = m.nextElementSibling),
												(r = parseInt(m.getAttribute('data-color-index'))),
												m.setAttribute('data-color-index', (r - 1).toString())
										for (let v = 0; v > u; v--)
											g.slots.splice(a.data, 1),
												g.slots.splice(a.data - 1, 0, a),
												a.data--,
												(m = m.previousElementSibling),
												(r = parseInt(m.getAttribute('data-color-index'))),
												m.setAttribute('data-color-index', (r + 1).toString())
										;(d = e.cloneNode(!0)), u > 0 ? (m.after(d), e.remove()) : u < 0 && (m.before(d), e.remove())
										let x = []
										for (let v of g.slots) x.push(v.hex)
										history.replaceState('', '', x.join('-'))
									},
								})
					}
					e.addEventListener('transitionend', y), e.addEventListener('transitioncancel', y)
				},
				{ once: !0 }
			)
	}
}
function ve() {
	onmousedown = (o) => {
		let e = o.target.closest('.create-page .swatch')
		if (e && !o.target.closest('.options div') && !o.target.closest('.options svg')) {
			let s = function (y) {
					if (t) {
						let p = y.y - c
						e.style.translate = '0 ' + p + 'px'
						let d = e,
							b = g.slots.length - r - 1
						if (((h = 0), (u = 0), p > 0))
							for (let m = 0; m < b; m++)
								(h = (m * 2 + 1) * i),
									(d = d.nextElementSibling),
									p > h
										? (u++, d.style.translate != '0 -100%' && (d.style.translate = '0 -100%'))
										: d.style.translate == '0 -100%' && (d.style.translate = '')
						else
							for (let m = 0; m < r; m++)
								(h = (m * 2 + 1) * i),
									(d = d.previousElementSibling),
									-p > h
										? (u--, d.style.translate != '0 100%' && (d.style.translate = '0 100%'))
										: d.style.translate == '0 100%' && (d.style.translate = '')
					} else {
						let p = y.x - n
						e.style.translate = p + 'px'
						let d = e,
							b = g.slots.length - r - 1
						if (((h = 0), (u = 0), p > 0))
							for (let m = 0; m < b; m++)
								(h = (m * 2 + 1) * l),
									(d = d.nextElementSibling),
									p > h
										? (u++, d.style.translate != '-100%' && (d.style.translate = '-100%'))
										: d.style.translate == '-100%' && (d.style.translate = '')
						else
							for (let m = 0; m < r; m++)
								(h = (m * 2 + 1) * l),
									(d = d.previousElementSibling),
									-p > h
										? (u--, d.style.translate != '100%' && (d.style.translate = '100%'))
										: d.style.translate == '100%' && (d.style.translate = '')
					}
				},
				t = !1
			document.body.classList.contains('vertical') && (t = !0),
				(g.plus.disabled = !0),
				g.plus.hide(),
				e.classList.add('is-dragging')
			let l = e.clientWidth / 2,
				i = e.clientHeight / 2,
				n = o.x,
				c = o.y,
				r = parseInt(e.getAttribute('data-color-index')),
				a = g.slots[r],
				u = 0,
				h
			addEventListener('mousemove', s),
				addEventListener(
					'mouseup',
					() => {
						e.classList.remove('is-dragging'),
							e.classList.add('is-released'),
							removeEventListener('mousemove', s),
							(e.style.translate = `${t ? '0 ' : ''}${u * 100}%`)
						function y() {
							e.removeEventListener('transitionend', y),
								e.removeEventListener('transitioncancel', y),
								e.classList.remove('is-released')
							let p = e
							for (let m = 0; m < u; m++)
								g.slots.splice(a.data, 1),
									g.slots.splice(a.data + 1, 0, a),
									a.data++,
									(p = p.nextElementSibling),
									g.slots[a.data - 1].data--
							for (let m = 0; m > u; m--)
								g.slots.splice(a.data, 1),
									g.slots.splice(a.data - 1, 0, a),
									a.data--,
									(p = p.previousElementSibling),
									g.slots[a.data + 1].data++
							let d = e.cloneNode(!0)
							u > 0 ? (p.after(d), e.remove()) : u < 0 && (p.before(d), e.remove()), (e.style.translate = '')
							let b = []
							for (let m of g.slots) {
								let x = document.getElementById(m.id)
								;(x.style.transition = 'transform 0s'),
									(x.style.translate = ''),
									setTimeout(() => {
										x.style.transition = ''
									}, 1),
									b.push(m.hex)
							}
							;(e = d),
								history.replaceState('', '', b.join('-')),
								(g.plus.disabled = !1),
								u &&
									H.create.push({
										undo() {
											g.plus.hide()
											let m = (e = document.getElementById(a.id))
											for (let v = 0; v < -u; v++) {
												g.slots.splice(a.data, 1),
													g.slots.splice(a.data + 1, 0, a),
													a.data++,
													(m = m.nextElementSibling)
												let L = parseInt(m.getAttribute('data-color-index'))
												m.setAttribute('data-color-index', (L - 1).toString())
											}
											for (let v = 0; v > -u; v--) {
												g.slots.splice(a.data, 1),
													g.slots.splice(a.data - 1, 0, a),
													a.data--,
													(m = m.previousElementSibling)
												let L = parseInt(m.getAttribute('data-color-index'))
												m.setAttribute('data-color-index', (L + 1).toString())
											}
											;(d = e.cloneNode(!0)), -u > 0 ? (m.after(d), e.remove()) : -u < 0 && (m.before(d), e.remove())
											let x = []
											for (let v of g.slots) x.push(v.hex)
											history.replaceState('', '', x.join('-'))
										},
										redo() {
											g.plus.hide()
											let m = (e = document.getElementById(a.id))
											for (let v = 0; v < u; v++)
												g.slots.splice(a.data, 1),
													g.slots.splice(a.data + 1, 0, a),
													a.data++,
													(m = m.nextElementSibling),
													(r = parseInt(m.getAttribute('data-color-index'))),
													m.setAttribute('data-color-index', (r - 1).toString())
											for (let v = 0; v > u; v--)
												g.slots.splice(a.data, 1),
													g.slots.splice(a.data - 1, 0, a),
													a.data--,
													(m = m.previousElementSibling),
													(r = parseInt(m.getAttribute('data-color-index'))),
													m.setAttribute('data-color-index', (r + 1).toString())
											;(d = e.cloneNode(!0)), u > 0 ? (m.after(d), e.remove()) : u < 0 && (m.before(d), e.remove())
											let x = []
											for (let v of g.slots) x.push(v.hex)
											history.replaceState('', '', x.join('-'))
										},
									})
						}
						e.addEventListener('transitionend', y), e.addEventListener('transitioncancel', y)
					},
					{ once: !0 }
				),
				(ondragstart = () => !1)
		}
	}
}
function be() {
	onkeydown = (o) => {
		var e, s, t
		if (o.metaKey || o.ctrlKey) {
			let { base: l } = N.deconstructURL(location.pathname)
			if (o.key === 'z' || o.key === 'Z')
				if (l === 'palettes') {
					o.shiftKey ? H.palettes.redo() : H.palettes.undo()
					return
				} else {
					o.shiftKey ? H.create.redo() : H.create.undo()
					return
				}
			if (l === 'create') {
				let i = parseInt(o.key)
				if (i >= 0 && i <= 9) {
					o.preventDefault()
					let n = g.slots[i - 1] || g.slots[g.slots.length - 1],
						c = document.getElementById(n.id)
					H.create.push({
						undo() {
							let r = g.slots[i - 1] || g.slots[g.slots.length - 1],
								a = document.getElementById(r.id)
							;(r.isLocked = !r.isLocked), a.querySelector('.lock').classList.toggle('locked')
						},
						redo() {
							let r = g.slots[i - 1] || g.slots[g.slots.length - 1],
								a = document.getElementById(r.id)
							;(r.isLocked = !r.isLocked), a.querySelector('.lock').classList.toggle('locked')
						},
					}),
						(n.isLocked = !n.isLocked),
						c.querySelector('.lock').classList.toggle('locked')
					return
				}
			}
		}
		if (o.key === ' ') {
			let { base: l } = N.deconstructURL(location.pathname)
			if (l === 'create') {
				o.preventDefault()
				let i = []
				for (let { hex: c } of g.slots) i.push(c)
				g.generate()
				let n = []
				for (let { hex: c } of g.slots) n.push(c)
				history.replaceState('', '', '/create/' + n.join('-')),
					H.create.push({
						undo: () => {
							g.generate(i), history.replaceState('', '', '/create/' + i.join('-')), g.plus.hide()
						},
						redo: () => {
							g.generate(n), history.replaceState('', '', '/create/' + n.join('-'))
						},
					})
			}
			return
		}
		if (o.key === 'Escape') {
			;(e = document.querySelector('.confirmation-screen')) == null || e.remove()
			return
		}
		if (o.key === 'y' || o.key === 'Y') {
			;((s = document.querySelector('.confirmation-screen')) == null ? void 0 : s.querySelector('.yes')).click()
			return
		}
		if (o.key === 'n' || o.key === 'N') {
			;((t = document.querySelector('.confirmation-screen')) == null ? void 0 : t.querySelector('.no')).click()
			return
		} //! NOT DONE
		if (o.key === 'Enter') {
			let l = document.activeElement
			console.log(l)
			return
		}
		o.key
	}
}
let g = new he(),
	A = new me(),
	N = new ye([
		['', U('Home', document.getElementById('landing-page'))],
		['palettes', U('Palettes', document.getElementById('palettes-page'), A)],
		['create', U('Create', document.getElementById('create-page'), g)],
		['404', U('404 Not Found', document.getElementById('not-found-page'))],
	])
N.routeToURL(location.pathname)
setTimeout(() => {
	;(document.querySelector(':root').style.display = 'initial'),
		window.innerHeight > window.innerWidth
			? document.body.classList.add('vertical')
			: document.body.classList.remove('vertical')
}, 200)
onpopstate = () => N.navigateTo(location.pathname, !0)
ge()
ve()
be()
onmouseover = (o) => {
	if (!g.plus.disabled) {
		const e = o.target,
			s = e.closest('.swatch')
		if (s)
			if (e.closest('.detector') && g.slots.length < 8) {
				const l = e.closest('.left')
				let i = parseInt(s.getAttribute('data-color-index'))
				l && i--, g.plus.show(i)
			} else g.plus.hide()
	}
}
k.info.firstVisit &&
	K({ message: 'This site relies on local storage and cookies to save palettes.', value: 'cookies' }, [
		{
			message: 'Sure, sounds good to me.',
			value: 'yes',
			call() {
				;(k.info = { firstVisit: !1 }), (k.settings = { cookiesOk: !0 })
				let o = E('Thanks, enjoy the site! :)')
				document.body.append(o)
			},
		},
		{
			message: "No thanks, I don't want to save palettes.",
			value: 'no',
			call() {
				;(k.info = { firstVisit: !1 }), (k.settings = { cookiesOk: !1 })
				for (let e = 0; e < A.items.length; e++) A.removeItem(0)
				let o = E("You won't be able to save your palettes. You can change this in settings.", { duration: 2500 })
				document.body.append(o)
			},
		},
	])
onresize = () => {
	window.innerHeight > window.innerWidth
		? document.body.classList.add('vertical')
		: document.body.classList.remove('vertical')
}
;(navigator.userAgent.includes('Android') || navigator.userAgent.includes('like Mac')) &&
	document.body.classList.add('mobile')

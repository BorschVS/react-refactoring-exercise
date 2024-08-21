import logoUrl from '../img/logo.png'

const Logo = () => (<div className='thumb'>
    <img
        src={logoUrl}
        style={{ width: '200px', marginTop: '50px' }}
        alt="Logo"
    />
</div>)

export default Logo;
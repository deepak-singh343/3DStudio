import {
    Color,
    Material,
    MeshPhongMaterial,
    MultiplyOperation,
    ShaderLib,
    ShaderMaterial,
    TangentSpaceNormalMap,
    UniformsUtils,
    Vector2
} from "three";

const vertexShader = `#define PHONG
varying vec3 vViewPosition;
varying vec3 vRefract[3];
varying float vReflectionFactor;
varying vec3 vReflect;
uniform float refractionRatio;
uniform float mFresnelBias;
uniform float mFresnelScale;
uniform float mFresnelPower;

#ifndef FLAT_SHADED
    varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
    #include <uv_vertex>
    #include <uv2_vertex>
    #include <color_vertex>
    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <defaultnormal_vertex>
#ifndef FLAT_SHADED
    vNormal = normalize( transformedNormal );
#endif
    #include <begin_vertex>
    #include <morphtarget_vertex>
    #include <skinning_vertex>
    #include <displacementmap_vertex>
    #include <project_vertex>
    #include <logdepthbuf_vertex>
    #include <clipping_planes_vertex>
    vViewPosition = - mvPosition.xyz;
    #include <worldpos_vertex>
    #include <envmap_vertex>
    #include <shadowmap_vertex>
    #include <fog_vertex>


	vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
    vec3 I = worldPosition.xyz - cameraPosition;
    vReflect = reflect( I, worldNormal );
    vRefract[0] = refract( normalize( I ), worldNormal, refractionRatio );
	vRefract[1] = refract( normalize( I ), worldNormal, refractionRatio * 0.99 );
	vRefract[2] = refract( normalize( I ), worldNormal, refractionRatio * 0.98 );
    vReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), mFresnelPower );
}`;

const fragmentShader = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float shininess;
uniform float opacity;
uniform vec3 specular;
varying vec3 vReflect;
varying vec3 vRefract[3];
varying float vReflectionFactor;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}


void main() {

    #include <clipping_planes_fragment>
    vec4 diffuseColor = vec4( diffuse, opacity );
    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
    vec3 totalEmissiveRadiance = emissive;
    #include <logdepthbuf_fragment>
    #include <map_fragment>
    #include <color_fragment>
    #include <alphamap_fragment>
    #include <alphatest_fragment>
    #include <specularmap_fragment>
    #include <normal_fragment_begin>
    #include <normal_fragment_maps>
    #include <emissivemap_fragment>
    vec4 reflectedColor = textureCube( envMap, vec3( -vReflect.x, vReflect.yz ) );
    vec4 refractedColor = vec4( 1.0 );
    refractedColor.r = textureCube( envMap, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;
	refractedColor.g = textureCube( envMap, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;
	refractedColor.b = textureCube( envMap, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;


    float reflectionPower = clamp( vReflectionFactor, 0.0, 1.0 );


    // vec2 st = gl_FragCoord.xy/vUv.xy;

    // float rnd = random( st );

    BlinnPhongMaterial material;
    material.diffuseColor = diffuseColor.rgb;
    material.specularColor = specular;
    material.specularShininess = shininess;
    material.specularStrength = specularStrength;
    #include <lights_fragment_begin>
    #include <lights_fragment_maps>
    #include <lights_fragment_end>
    #include <aomap_fragment>

    
    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse  + totalEmissiveRadiance;
    vec3 specularComponent = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
    // specularComponent = refractedColor.rgb;

    outgoingLight = outgoingLight + specularComponent;
    #include <envmap_fragment>

    
    vec4 phongOutput = vec4( outgoingLight, diffuseColor.a );
    // vec4 finalOutput = mix( phongOutput, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) ); 
    gl_FragColor = phongOutput;
    #include <tonemapping_fragment>
    #include <encodings_fragment>
    #include <fog_fragment>
    #include <premultiplied_alpha_fragment>
    #include <dithering_fragment>
}`;

const fresnelUniforms = {
    'mRefractionRatio': {
        value: 1.02
    },
    'mFresnelBias': {
        value: 0.1
    },
    'mFresnelPower': {
        value: 2.0
    },
    'mFresnelScale': {
        value: 1.0
    },
}

class CrystalMaterial extends MeshPhongMaterial {
    constructor(parameters) {
        super();
        this.type = 'CrystalMaterial';
        this.color = new Color(0xffffff); // diffuse

        this.defines = {};
        this.uniforms = UniformsUtils.clone(ShaderLib.phong.uniforms)

        this.uniforms = {
            ...this.uniforms,
            ...fresnelUniforms
        }
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;

        this.specular = new Color(0x111111);
        this.shininess = 30;
        this.map = null;
        this.ligts = true;
        this.skinning = true;
        this.transparent = true;
        this.lightMap = null;
        this.lightMapIntensity = 1.0;
        this.aoMap = null;
        this.aoMapIntensity = 1.0;
        this.emissive = new Color(0x000000);
        this.emissiveIntensity = 1.0;
        this.emissiveMap = null;
        this.bumpMap = null;
        this.bumpScale = 1;
        this.normalMap = null;
        this.normalMapType = TangentSpaceNormalMap;
        this.normalScale = new Vector2(1, 1);
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.specularMap = null;
        this.alphaMap = null;
        this.envMap = null;
        this.combine = MultiplyOperation;
        this.reflectivity = 1;
        this.refractionRatio = 0.98;
        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.wireframeLinecap = 'round';
        this.wireframeLinejoin = 'round';
        this.morphTargets = false;
        this.morphNormals = false;
        this.flatShading = false;
        this.setValues(parameters);
    }

    copy(source) {
        super.copy(source);
        this.color.copy(source.color);
        this.specular.copy(source.specular);
        this.shininess = source.shininess;
        this.map = source.map;
        this.lightMap = source.lightMap;
        this.lightMapIntensity = source.lightMapIntensity;
        this.aoMap = source.aoMap;
        this.aoMapIntensity = source.aoMapIntensity;
        this.emissive.copy(source.emissive);
        this.emissiveMap = source.emissiveMap;
        this.emissiveIntensity = source.emissiveIntensity;
        this.bumpMap = source.bumpMap;
        this.bumpScale = source.bumpScale;
        this.normalMap = source.normalMap;
        this.normalMapType = source.normalMapType;
        this.normalScale.copy(source.normalScale);
        this.displacementMap = source.displacementMap;
        this.displacementScale = source.displacementScale;
        this.displacementBias = source.displacementBias;
        this.specularMap = source.specularMap;
        this.alphaMap = source.alphaMap;
        this.envMap = source.envMap;
        this.combine = source.combine;
        this.reflectivity = source.reflectivity;
        this.refractionRatio = source.refractionRatio;
        this.wireframe = source.wireframe;
        this.wireframeLinewidth = source.wireframeLinewidth;
        this.wireframeLinecap = source.wireframeLinecap;
        this.wireframeLinejoin = source.wireframeLinejoin;
        this.morphTargets = source.morphTargets;
        this.morphNormals = source.morphNormals;
        this.flatShading = source.flatShading;
        return this;
    }

}


export {
    CrystalMaterial,
    vertexShader as CrystalVertexShader,
    fragmentShader as CrystalFragmentShader
}
